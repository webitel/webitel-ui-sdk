<template>
  <wt-input
    :value="value"
    label="After input slot usage"
    @input="handler"
  >
    <template #after-input>
      <wt-icon-btn icon="edit" />
      <wt-icon-btn
        icon="edit"
        size="sm"
      />
      <wt-icon-btn icon="edit" />
      <wt-icon-btn
        icon="edit"
        size="sm"
      />
    </template>
  </wt-input>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('loooooooooooooooooooooooooooooooooooooooooong value');

const handler = (e) => {
  value.value = e;
};
</script>
