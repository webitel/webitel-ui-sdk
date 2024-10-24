<template>
  <div class="wt-action-bar">
    <!--    @slot searchbar here
            @scope `{ size<ComponentSize> }`
     -->
    <slot
      name="search-bar"
      v-bind="{ size }"
    />

    <!--    @slot custom actions here
            @scope `{ size<ComponentSize> }`
     -->
    <slot
      v-bind="{ size }"
    />

    <!--    @slot May be useful to set complex component which draws the same `wt-icon-action`
            @scope `{ action<IconAction>, size<ComponentSize> }`
      -->
    <slot
      v-for="action in shownActions"
      :name="action"
      v-bind="{ action, size }"
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
import { tableActionsOrder, cardActionsOrder } from './WtActionBarActionsOrder.js';

const props = defineProps({
  /**
   * [`'table'`, `'card'`]
   * */
  mode: {
    type: String,
    default: 'table',
    validator: (v) => ['table', 'card'].includes(v),
  },
  /**
   * see `IconAction` enum
   */
  actions: {
    type: Array,
    default: () => [],
    validator: (v) => v.every((action) => Object.values(IconAction).includes(action)),
  },

  /**
   * Not implemented
   */
  size: {
    type: String,
    // default: 'md',
    // validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
});

const emit = defineEmits(Object.values(IconAction).map((action) => `click:${action}`));

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
