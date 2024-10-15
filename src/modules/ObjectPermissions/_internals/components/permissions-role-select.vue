<template>
  <wt-select
    class="permissions-role-select"
    option-label="name"
    v-bind="attrs"
  >
    <template #singleLabel="{ option, optionLabel }">
      <role-row :role="option.user">
        {{ option[optionLabel] || option }}
      </role-row>
    </template>

    <template #option="{ option, optionLabel }">
      <role-row :role="option.user">
        {{ option[optionLabel] || option }}
      </role-row>
    </template>
  </wt-select>
</template>

<script setup>
import { useAttrs } from 'vue';
import RoleRow from './permissions-role-row.vue';

const attrs = useAttrs();
</script>

<style lang="scss" scoped>

</style>
