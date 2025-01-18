<script setup>
import { ref } from 'vue';
// IMPORT ME FROM:
// import AgentStatus from '@webitel/ui-sdk/src/enums/AgentStatus/AgentStatus.enum';
import AgentStatus from '../../../../../../src/enums/AgentStatus/AgentStatus.enum';

const status = ref(AgentStatus.ONLINE);
</script>

<template>
  <wt-status-select
    :status="status"
    @change="status = $event"
  ></wt-status-select>
</template>

<style scoped lang="scss"></style>
