<template>
  <wt-single-select
    class="permissions-role-select"
    option-label="name"
    v-bind="attrs"
    v-model:model-value="model"
  >
    <template #value="{ value, getOptionLabel }">
      <role-row :role="value">
        {{ getOptionLabel(value) || value }}
      </role-row>
    </template>

    <template #option="{ option, getOptionLabel }">
      <role-row :role="option">
        {{ getOptionLabel(option) || option }}
      </role-row>
    </template>
  </wt-single-select>
</template>

<script setup>
import { useAttrs } from 'vue';

import RoleRow from './permissions-role-row.vue';

const attrs = useAttrs();

const model = defineModel({
	required: true,
});
</script>

<style lang="scss" scoped></style>
