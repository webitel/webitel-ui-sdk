<script setup>
import { ref } from 'vue';
import { ButtonVariant, ComponentSize } from '../../../../../../../src/enums';

const tabs = [
  {
    text: 'XS',
    value: ComponentSize.XS,
  },
  {
    text: 'SM',
    value: ComponentSize.SM,
  },
  {
    text: 'MD',
    value: ComponentSize.MD,
  },
]

const currentSize = ref(tabs[0]);
</script>

<template>
  <wt-tabs :current="currentSize" :tabs="tabs" wide @change="currentSize = $event" />
  <div class="flex py-4 gap-2">
    <wt-button disabled icon="call" :variant="ButtonVariant.ACTIVE" :size="currentSize.value" />
    <wt-button disabled icon="call" :variant="ButtonVariant.ACTIVE" :size="currentSize.value" rounded />
    <wt-button disabled icon="call" :variant="ButtonVariant.OUTLINED" :size="currentSize.value" />
  </div>
</template>
