<script setup>
import { ref } from 'vue';
import { ButtonVariant, ComponentSize } from '../../../../../../../src/enums';

const loading = ref(false);

const colors = [
  'primary',
  'secondary',
  'success',
  'warn',
  'error',
  'info',
  'job',
  'transfer',
];

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

const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 0);
};
</script>

<template>
  <wt-tabs 
    :current="currentSize"
    :tabs="tabs"
    wide
    @change="currentSize = $event"
  />
  <div class="flex gap-2 mt-2">
    <wt-button
      v-for="color in colors"
      :key="color"
      :color="color"
      :loading="loading"
      icon="call"
      :variant="ButtonVariant.ACTIVE"
      :size="currentSize.value"
      @click="load"
    />
  </div>
  <div class="flex gap-2 mt-2">
    <wt-button
      v-for="color in colors"
      :key="color"
      :color="color"
      :loading="loading"
      icon="call"
      :variant="ButtonVariant.ACTIVE"
      :size="currentSize.value"
      rounded
      @click="load"
    />
  </div>
  <div class="flex gap-2 mt-2">
    <wt-button
      v-for="color in colors"
      :key="color"
      :color="color"
      :loading="loading"
      icon="call"
      :variant="ButtonVariant.OUTLINED"
      :size="currentSize.value"
      @click="load"
    />
  </div>
</template>

<style lang="scss" scoped></style>
