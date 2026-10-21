<template>
  <wt-single-select
    class="permissions-role-select"
    option-label="name"
    v-bind="attrs"
    v-model:model-value="model"
  >
    <template #value="{ value, getOptionLabel }">
      <permissions-role-row :role="value">
        {{ getOptionLabel(value) || value }}
      </permissions-role-row>
    </template>

    <template #option="{ option, getOptionLabel }">
      <permissions-role-row :role="option">
        {{ getOptionLabel(option) || option }}
      </permissions-role-row>
    </template>
  </wt-single-select>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

import type { PermissionGrantee } from '../../types/Permission.types';
import PermissionsRoleRow from './permissions-role-row.vue';

const attrs = useAttrs();

const model = defineModel<PermissionGrantee | null>({
	required: true,
});
</script>

<style lang="scss" scoped></style>
