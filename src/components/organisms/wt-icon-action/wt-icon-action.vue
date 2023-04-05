<template>
  <component
    :is="actionComponent"
  ></component>
</template>

<script setup>
import { computed } from 'vue';
import WtDeleteIconAction from './_internals/wt-delete-icon-action.vue';
import WtEditIconAction from './_internals/wt-edit-icon-action.vue';

const props = defineProps({
  action: {
    type: String,
    required: true,
    options: ['delete', 'edit'],
  },
});

const actionComponent = computed(() => {
  switch (props.action) {
    case 'edit': return WtEditIconAction;
    case 'delete': return WtDeleteIconAction;
    default: return WtEditIconAction;
  }
});
</script>

<style lang="scss" scoped>

</style>
