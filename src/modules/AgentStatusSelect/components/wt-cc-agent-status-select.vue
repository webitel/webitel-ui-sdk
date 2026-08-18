<template>
  <article class="wt-cc-agent-status-select">
    <wt-switcher
      v-if="showCallCenterSwitcher"
      controlled
      :label="t('agentStatus.callCenter')"
      :model-value="isCallCenterOn"
      class="wt-cc-agent-status-select__call-center-switcher"
      @update:model-value="toggleCallCenterMode"
    />
    <wt-status-select
			:key="status"
      :status="status"
      :status-duration="statusDuration"
      @closed="handleClosed"
      @change="handleSelectInput"
      class="wt-cc-agent-status-select__status-select"
    />
    <activity-type-popup
      v-if="isActivityTypePopup"
      :options="activityTypes"
      @change="handleActivityTypeInput"
      @close="closeActivityTypePopup"
    />
    <pause-cause-popup
      v-if="isPauseCausePopup"
      :options="pauseCauses"
      @change="handlePauseCauseInput"
      @close="closePauseCausePopup"
    />
    <status-select-error-popup
      v-if="error"
      :error="error"
      @close="error = null"
    />
  </article>
</template>

<script setup lang="ts">
import { OnlineSkillsAPI } from '@webitel/api-services/api';
import type { EngineForAgentPauseCause } from '@webitel/api-services/gen';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { PauseNotAllowedError } from 'webitel-sdk';
import WtSwitcher from '../../../components/wt-switcher/wt-switcher.vue';
import { AgentStatus } from '../../../enums';
import type { LookupOption } from '../../../types';
import AgentStatusAPIFactory from '../api/agent-status.js';
import PauseCauseAPIFactory from '../api/pause-cause.js';
import { useCCenterModeSwitcher } from '../composables/useCCenterModeSwitcher';
import { REPEATABLE_AGENT_STATUSES } from '../types/RepeatableAgentStatus.enum';
import type { StatusChangePayload } from '../types/StatusChangePayload.types';
import ActivityTypePopup from './_internals/wt-cc-activity-type-popup.vue';
import PauseCausePopup from './_internals/wt-cc-pause-cause-popup.vue';
import StatusSelectErrorPopup from './_internals/wt-cc-status-select-error-popup.vue';

type ActivityType = LookupOption;

const props = withDefaults(
	defineProps<{
		agentId: string | number;
		status?: string;
		statusDuration?: string | number;
		showCallCenterSwitcher?: boolean;
		isCallCenterOn?: boolean;
	}>(),
	{
		status: AgentStatus.OFFLINE,
		statusDuration: 0,
		showCallCenterSwitcher: false,
		isCallCenterOn: false,
	},
);

const emit = defineEmits<{
	changed: [
		payload: StatusChangePayload,
	];
	'changed-call-center-mode': [
		payload?: ActivityType,
	];
}>();

const { api } = useStore().state;
const AgentStatusAPI = AgentStatusAPIFactory(api);
const PauseCauseAPI = PauseCauseAPIFactory(api);
const { t } = useI18n();

const isPauseCausePopup = ref(false);
const pauseCauses = ref<EngineForAgentPauseCause[]>([]);
const error = ref(null);
const chosenStatus = ref('');

const isActivityTypePopup = ref(false);
const activityTypes = ref<ActivityType[]>([]);

const defaultActivityTypeOption = ref<ActivityType | null>(null);

const { callCenterModeChanging, toggleCallCenterMode } = useCCenterModeSwitcher(
	{
		activityTypes,
		loadActivityTypes,
		openActivityTypePopup,
		emit,
	},
);

function openPauseCausePopup() {
	isPauseCausePopup.value = true;
}

function closePauseCausePopup() {
	isPauseCausePopup.value = false;
}

async function loadPauseCauses(): Promise<void> {
	const response = await PauseCauseAPI.getList({
		agentId: props.agentId,
	});
	pauseCauses.value = response.items;
}

function openActivityTypePopup() {
	isActivityTypePopup.value = true;
}

function closeActivityTypePopup() {
	isActivityTypePopup.value = false;
	callCenterModeChanging.value = false;
}

async function loadActivityTypes(): Promise<void> {
	const response = await OnlineSkillsAPI.getList({
		skipDefault: false,
	});
	defaultActivityTypeOption.value = response.items[0];
	activityTypes.value = [
		{
			id: defaultActivityTypeOption.value?.id,
			name: t('webitelUI.agentStatusSelect.activityTypePopup.defaultOption'),
		},
		...response.items.slice(1),
	];
}

async function updateStatus({
	agentId,
	status,
	pauseCause,
	statusComment,
	onlineSkill,
}: StatusChangePayload) {
	return AgentStatusAPI.patch({
		agentId,
		status,
		pauseCause,
		statusComment,
		onlineSkill,
	});
}

async function changeStatus({
	status,
	pauseCause,
	statusComment,
	onlineSkill,
}: Omit<StatusChangePayload, 'agentId'>) {
	try {
		const statusPayload: StatusChangePayload = {
			agentId: props.agentId,
			status,
			pauseCause,
			statusComment,
			...(status === AgentStatus.ONLINE && {
				onlineSkill,
			}),
		};
		await updateStatus(statusPayload);
		emit('changed', statusPayload);
	} catch (err) {
		if (err.response.data.id === PauseNotAllowedError.id) error.value = err;
		throw err;
	}
}

async function handleStatus(status: string) {
	if (status === AgentStatus.ONLINE) {
		await loadActivityTypes();
		if (activityTypes.value.length > 1) {
			openActivityTypePopup();
			return;
		}
	} else if (status === AgentStatus.PAUSE) {
		await loadPauseCauses();
		if (pauseCauses.value.length) {
			openPauseCausePopup();
			return;
		}
	}
	if (status === props.status) return;
	await changeStatus({
		status,
	});
}

function handleSelectInput(newStatus: string) {
	handleStatus(newStatus);
	chosenStatus.value = newStatus;
	// we need to save changes which come from input, because sometimes we want
	// to choose 'pause/online' repeatedly and have to check the previous status
}

function handleClosed(event: { value: string }) {
	// sometimes we want to choose 'pause/online' repeatedly
	// but 'change' event from wt-status-select can't give us the same value,
	// in this case we have to use value from 'closed' event to choose the status again
	if (
		(event.value === chosenStatus.value || !chosenStatus.value) && // if closed status the same as chosen, or chosen status is empty
		REPEATABLE_AGENT_STATUSES.includes(event.value)
	) {
		// and only for repeatable statuses
		handleStatus(event.value);
	}
}

function handleActivityTypeInput(activityType: ActivityType) {
	const payload =
		activityType.id === defaultActivityTypeOption.value?.id
			? defaultActivityTypeOption.value
			: activityType;
	if (callCenterModeChanging.value) {
		emit('changed-call-center-mode', payload);
		callCenterModeChanging.value = false;
	} else {
		return changeStatus({
			status: AgentStatus.ONLINE,
			onlineSkill: payload,
		});
	}
}

function handlePauseCauseInput({
	pauseCause,
	statusComment,
}: {
	pauseCause: string;
	statusComment: string;
}) {
	const status = AgentStatus.PAUSE;
	return changeStatus({
		status,
		pauseCause,
		statusComment,
	});
}
</script>

<style lang="scss" scoped>
.wt-cc-agent-status-select {
  display: flex;
  &__call-center-switcher{
    margin-right: var(--wt-app-header-content-gap);
  }
  &__status-select {
    width: 150px;
  }
}
</style>
