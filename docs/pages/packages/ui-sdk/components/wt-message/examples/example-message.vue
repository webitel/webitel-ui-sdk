<template>
  <wt-tabs
    :current="currentVariant"
    :tabs="tabs"
    wide
    @change="currentVariant = $event"
  />
  <div class="example-container">
    <wt-message :severity="MessageColor.INFO" :variant="currentVariant.value">
      This is an info message
    </wt-message>

    <wt-message :severity="MessageColor.SUCCESS" :variant="currentVariant.value">
      Operation completed successfully
    </wt-message>

    <wt-message :severity="MessageColor.WARN" :variant="currentVariant.value">
      Warning: Please review your input
    </wt-message>

    <wt-message :severity="MessageColor.ERROR" :variant="currentVariant.value">
      An error occurred while processing
    </wt-message>

    <wt-message :severity="MessageColor.CONTRAST" :variant="currentVariant.value">
      This is an contrast message
    </wt-message>

    <wt-message :severity="MessageColor.SECONDARY" :variant="currentVariant.value">
      This is an secondary message
    </wt-message>
  </div>
</template>

<script setup>
import { MessageColor, MessageVariant } from '../../../../../../../src/enums';
import { ref } from 'vue';

const tabs = [
  {
    text: 'Filled',
    value: MessageVariant.FILLED,
  },
  {
    text: 'Outlined',
    value: MessageVariant.OUTLINED,
  },
  {
    text: 'Simple',
    value: MessageVariant.SIMPLE,
  },
]

const currentVariant = ref(tabs[0]);
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 20px;
}
</style>
