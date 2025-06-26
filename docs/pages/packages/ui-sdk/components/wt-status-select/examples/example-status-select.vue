<script setup>
import { ref } from 'vue';

import { AgentStatus } from'@webitel/ui-sdk/enums';

const status = ref(AgentStatus.ONLINE);
</script>

<template>
  <wt-status-select
    :status="status"
    @change="status = $event"
  />
</template>

<style scoped lang="scss"></style>
