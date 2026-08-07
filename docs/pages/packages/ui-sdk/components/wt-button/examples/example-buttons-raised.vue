<script setup>
import { ref } from 'vue';
import { ButtonVariant } from '../../../../../../../src/enums';

const tabs = [
	{
		text: 'Active',
		value: ButtonVariant.ACTIVE,
	},
	{
		text: 'Outlined',
		value: ButtonVariant.OUTLINED,
	},
	{
		text: 'Text',
		value: ButtonVariant.TEXT,
	},
];

const currentVariant = ref(tabs[0]);
</script>

<template>
  <wt-tabs
    :current="currentVariant"
    :tabs="tabs"
    wide
    @change="currentVariant = $event"
  />
  <div
    style="display: grid; grid-template-columns: 140px; gap: var(--spacing-xs); margin-top: 20px;"
  >
    <wt-button
      raised
      :variant="currentVariant.value"
    >
      Primary
    </wt-button>
    <wt-button
      color="secondary"
      raised
      :variant="currentVariant.value"
    >
      Secondary
    </wt-button>
    <wt-button
      disabled
      raised
      :variant="currentVariant.value"
    >
      Disabled
    </wt-button>
    <wt-button
      color="success"
      raised
      :variant="currentVariant.value"
    >
      Success
    </wt-button>
    <wt-button
      color="error"
      raised
      :variant="currentVariant.value"
    >
      Error
    </wt-button>
    <wt-button
      color="transfer"
      raised
      :variant="currentVariant.value"
    >
      Transfer
    </wt-button>
    <wt-button
      color="job"
      raised
      :variant="currentVariant.value"
    >
      Job
    </wt-button>
    <wt-button
      color="info"
      raised
      :variant="currentVariant.value"
    >
      info
    </wt-button>
  </div>
</template>

<style scoped lang="scss"></style>
