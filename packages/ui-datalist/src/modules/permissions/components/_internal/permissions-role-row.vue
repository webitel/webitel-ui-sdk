<template>
  <div class="permissions-role-row">
    <wt-icon :icon="role.user ? 'user' : 'role'" />
    <slot>
      {{ role.name }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { PermissionGrantee } from '../../types/Permission.types';

defineProps<{
	role: PermissionGrantee;
}>();
</script>

<style lang="scss" scoped>
.permissions-role-row {
  display: grid;
  grid-template-columns: var(--icon-md-size) 1fr;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
