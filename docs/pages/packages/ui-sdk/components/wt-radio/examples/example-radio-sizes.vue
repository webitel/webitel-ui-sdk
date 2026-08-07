<script setup>
import { ref } from 'vue';

const small = ref('value1');
const normal = ref('value1');
const large = ref('value1');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <div>
      <wt-radio
        v-model:selected="small"
        value="value1"
        label="Small 1"
        size="sm"
      />
      <wt-radio
        v-model:selected="small"
        value="value2"
        label="Small 2"
        size="sm"
      />
    </div>
    <div>
      <wt-radio
        v-model:selected="normal"
        value="value1"
        label="Normal 1"
      />
      <wt-radio
        v-model:selected="normal"
        value="value2"
        label="Normal 2"
      />
    </div>
    <div>
      <wt-radio
        v-model:selected="large"
        value="value1"
        label="Large 1"
        size="lg"
      />
      <wt-radio
        v-model:selected="large"
        value="value2"
        label="Large 2"
        size="lg"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
