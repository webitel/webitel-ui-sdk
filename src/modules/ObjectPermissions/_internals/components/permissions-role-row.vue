<template>
  <div class="permissions-role-row">
    <wt-icon
      :icon="role.user ? 'user' : 'role'"
    />
    <slot>
      {{ role.name }}
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  role: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.permissions-role-row {
  display: grid;
  align-items: center;
  grid-template-columns: var(--icon-md-size) 1fr;
  gap: var(--spacing-sm);
}
</style>
