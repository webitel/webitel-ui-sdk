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
    <slot v-bind="{ size }" />

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
        :disabled="props[`disabled:${action}`]"
        @click="emit(`click:${action}`)"
      />
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import IconAction from '../../enums/IconAction/IconAction.enum.js';
import WtIconAction from '../wt-icon-action/wt-icon-action.vue';
import {
  tableActionsOrder,
  sectionActionsOrder,
} from './WtActionBarActionsOrder.js';

const props = defineProps({
  /**
   * [`'table'`, `'section'`]
   * */
  mode: {
    type: String,
    default: 'table',
    validator: (v) => ['table', 'section'].includes(v),
  },

  /**
   * Not implemented
   */
  size: {
    type: String,
    // default: 'md',
    // validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },

  /**
   * Leave the default value for the mode only listed in includes prop
   */

  include: {
    type: Array,
    default: () => [],
  },

  /**
   * Leave the default values for the mode, except for those in exclude prop
   */

  exclude: {
    type: Array,
    default: () => [],
  },

  /**
   * Built dynamically on `disabled:[IconAction]` pattern for all available [IconActions](../../enums/IconAction/Readme.md).
   */

  disabled: {
    // Not implemented, but can be used to disable all actions
    type: Boolean,
    default: false,
  },

  ...Object.values(IconAction).reduce((acc, action) => {
    acc[`disabled:${action}`] = { type: Boolean, default: false };
    return acc;
  }, {}),
});
const emit = defineEmits([
  /**
   * click:IconAction
   */
  ...Object.values(IconAction).map((action) => `click:${action}`),
]);

const shownActions = computed(() => {
  const actionsOrder =
    props.mode === 'section' ? sectionActionsOrder : tableActionsOrder;

  if (props.include.length)
    return actionsOrder.filter((action) => props.include.includes(action));

  if (props.exclude.length)
    return actionsOrder.filter((action) => !props.exclude.includes(action));

  return actionsOrder;
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
