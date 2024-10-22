<template>
  <div class="wt-action-bar">
    <!--    @slot -->
    <slot name="search-bar" />

    <!--    @slot
            @scope="{ `action`: IconAction enum string }"
      -->
    <slot
      v-for="action in shownActions"
      v-bind="{ action }"
    >
      <wt-icon-action
        :action="action"
        @click="emit(`click:${action}`)"
      />
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import IconAction from '../../enums/IconAction/IconAction.enum.js';
import WtIconAction from '../wt-icon-action/wt-icon-action.vue';

const props = defineProps({
  // options: [`table`, `card`]
  mode: {
    type: String,
    default: 'table',
    validator: (v) => ['table', 'card'].includes(v),
  },
  /**
   * see IconAction enum
   */
  actions: {
    type: Array,
    default: () => [],
    validator: (v) => v.every((action) => Object.values(IconAction).includes(action)),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v),
  },
});

const emit = defineEmits(Object.values(IconAction).map((action) => `click:${action}`));

const tableActionsOrder = [
  IconAction.ADD,
  IconAction.COLUMNS,
  IconAction.COPY,
  IconAction.DOWNLOAD,
  IconAction.UPLOAD,
  IconAction.FILTERS,
  IconAction.DELETE,
  IconAction.REFRESH,
];

// TODO
const cardActionsOrder = tableActionsOrder;

const shownActions = computed(() => {
  const actionsOrder = props.mode === 'card' ? cardActionsOrder : tableActionsOrder;

  return actionsOrder.filter((action) => props.actions.includes(action));
});
</script>

<style lang="scss" scoped>
.wt-action-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}
</style>
