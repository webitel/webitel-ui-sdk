<template>
  <article class="wt-cc-agent-status-select">
    <wt-status-select
      :status="status"
      :status-duration="statusDuration"
      @change="handleStatusSelectInput"
    ></wt-status-select>
    <pause-cause-popup
      v-if="isPauseCausePopup"
      :options="pauseCauses"
      @change="handlePauseCauseInput"
      @close="closePauseCausePopup"
    ></pause-cause-popup>
    <status-select-error-popup
      v-if="error"
      :error="error"
      @close="error = null"
    ></status-select-error-popup>
  </article>
</template>

<script setup>
import AgentStatus from '../../../enums/AgentStatus/AgentStatus.enum';
import { ref } from 'vue';
import { useStore } from 'vuex';
import AgentStatusAPIFactory from '../api/agent-status';
import PauseCauseAPIFactory from '../api/pause-cause';
import PauseCausePopup from './_internals/wt-cc-pause-cause-popup.vue';
import StatusSelectErrorPopup from './_internals/wt-cc-status-select-error-popup.vue';

const props = defineProps({
  agentId: {
    type: [String, Number],
    required: true,
  },
  status: {
    // can be undefined, is agent wasn't loaded yet
    default: AgentStatus.OFFLINE,
  },
  statusDuration: {
    type: [Number, String],
    default: 0,
  },
});

const emit = defineEmits(['changed']);

const { api } = useStore().state;
const AgentStatusAPI = AgentStatusAPIFactory(api);
const PauseCauseAPI = PauseCauseAPIFactory(api);

const isPauseCausePopup = ref(false);
const pauseCauses = ref([]);
const error = ref(null);

function openPauseCausePopup() {
  isPauseCausePopup.value = true;
}

function closePauseCausePopup() {
  isPauseCausePopup.value = false;
}

async function loadPauseCauses() {
  const response = await PauseCauseAPI.getList({ agentId: props.agentId });
  pauseCauses.value = response.items;
}

async function updateStatus({ agentId, status, pauseCause }) {
  return AgentStatusAPI.patch({ agentId, status, pauseCause });
}

async function changeStatus({ status, pauseCause }) {
  try {
    const statusPayload = { agentId: props.agentId, status, pauseCause };
    await updateStatus(statusPayload);
    emit('changed', statusPayload);
  } catch (err) {
    error.value = err;
    throw err;
  }
}

async function handleStatusSelectInput(status) {
  if (status === AgentStatus.PAUSE) {
    await loadPauseCauses();
    if (pauseCauses.value.length) {
      openPauseCausePopup();
      return;
    }
  }
  if (status === props.status) return;
  await changeStatus({ status });
}

function handlePauseCauseInput(pauseCause) {
  const status = AgentStatus.PAUSE;
  return changeStatus({ status, pauseCause });
}
</script>

<style lang="scss" scoped>
.wt-cc-agent-status-select .wt-status-select {
  max-width: 200px;
}
</style>
