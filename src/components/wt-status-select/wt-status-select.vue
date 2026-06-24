<template>
  <wt-single-select
    :show-clear="false"
    :options="availableOptions"
    :filterable="false"
    :model-value="selectedOption"
    class="wt-status-select"
    data-key="value"
		:size="ComponentSize.SM"
    @closed="closedHandler"
    @update:model-value="inputHandler"
  >
    <template #value="{ value }">
      <wt-indicator
        :color="value.color"
        :text="duration"
      />
    </template>
    <template #option="{ option }">
      <wt-indicator
        :color="option.color"
        :text="option.text"
      />
    </template>
  </wt-single-select>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { AgentStatus, ComponentSize } from '../../enums';
import convertDuration from '../../scripts/convertDuration.js';
import StatusOptions from './_internals/StatusOptions.lookup.js';

interface StatusOption {
	color: string;
	text: string;
	value: string;
	locale?: string;
}

const props = withDefaults(
	defineProps<{
		status?: string;
		statusDuration?: string | number;
		options?: StatusOption[];
	}>(),
	{
		status: AgentStatus.OFFLINE,
		statusDuration: 0,
	},
);

const emit = defineEmits<{
	change: [
		value: string,
	];
	closed: [
		event: Event,
	];
}>();

const { t } = useI18n();

const statusOptions = computed<StatusOption[]>(() =>
	props.options
		? props.options
		: StatusOptions.map((opt) => ({
				...opt,
				text: t(opt.locale),
			})),
);

const selectedOption = computed<StatusOption | undefined>(() =>
	statusOptions.value.find((option) => option.value === props.status),
);

const availableOptions = computed<StatusOption[]>(() =>
	statusOptions.value.reduce<StatusOption[]>((options, opt) => {
		// PAUSE option is always passed
		if (
			(props.status === opt.value && opt.value !== AgentStatus.PAUSE) ||
			opt.value === AgentStatus.BREAK_OUT
		) {
			// skip breakout option
			return options;
		}
		options.push(opt);
		return options;
	}, []),
);

const duration = computed<string>(() => {
	/* The check commented below limits the display of time in the status to 8 characters.
  Accordingly, if the agent is in the status of 100 hours (100: 00: 00),
  then this time will be displayed as NaN:NaN:NaN */

	// if (typeof props.statusDuration === 'string' && props.statusDuration.length === 8) return props.statusDuration;
	if (typeof props.statusDuration === 'string') return props.statusDuration;
	if (props.statusDuration !== undefined)
		return convertDuration(props.statusDuration);
	return selectedOption.value?.text ?? '';
});

function inputHandler(value: StatusOption) {
	emit('change', value.value);
}

function closedHandler(event: Event) {
	emit('closed', event);
}
</script>
