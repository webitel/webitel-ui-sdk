<template>
  <article class="wt-cc-agent-status-select">
    <wt-status-select
      :status="status"
      :status-duration="statusDuration"
      @closed="handleClosed"
      @change="handleSelectInput"
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

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { PauseNotAllowedError } from 'webitel-sdk';

import AgentStatus from '../../../enums/AgentStatus/AgentStatus.enum.js';
import AgentStatusAPIFactory from '../api/agent-status.js';
import PauseCauseAPIFactory from '../api/pause-cause.js';
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
const chosenStatus = ref('');

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
    if (err.response.data.id === PauseNotAllowedError.id) error.value = err;
    throw err;
  }
}

async function handleStatus(status) {
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

function handleSelectInput(newStatus) {
  handleStatus(newStatus);
  chosenStatus.value = newStatus;
  // we need to save changes which come from input, because sometimes we want
  // to choose 'pause' repeatedly and have to check the previous status
}

function handleClosed(event) {
  // sometimes we want to choose 'pause' repeatedly
  // but 'change' event from wt-status-select can't give us the same value,
  // in this case we have to use value from 'closed' event to choose 'pause' status
  if (
    (event.value === chosenStatus.value || !chosenStatus.value) && // if closed status the same as chosen, or chosen status is empty
    event.value === AgentStatus.PAUSE
  ) {
    // and only for 'pause' status
    handleStatus(event.value);
  }
}

function handlePauseCauseInput(pauseCause) {
  const status = AgentStatus.PAUSE;
  return changeStatus({ status, pauseCause });
}
</script>

<style lang="scss" scoped>
.wt-cc-agent-status-select .wt-status-select {
  width: 150px;
}
</style>
