<template>
  <div class="wt-action-bar">
    <!--    @slot searchbar here
            @scope `{ size<ComponentSize> }`
     -->
    <slot
      name="search-bar"
      v-bind="{ size }"
    />

    <!--    @slot switcher here
            @scope `{ size<ComponentSize> }`
     -->
    <slot
      name="switcher"
      v-bind="{ size }"
    />

    <!--    @slot custom actions here
            @scope `{ size<ComponentSize> }`
     -->
    <slot v-bind="{ size }" />

    <!--    @slot May be useful to set complex component which draws the same `wt-icon-action`
            @scope `{ action<IconAction>, size<ComponentSize>, onClick: () => emit('click:[action]') }`
      -->
    <slot
      v-for="action in shownActions"
      :name="action"
      v-bind="{ action, size, onClick: () => handleActionClick(action) }"
    >
      <wt-icon-action
        :action="action"
        :disabled="isActionDisabled(action)"
        v-bind="getActionProps(action)"
        @click="handleActionClick(action)"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';

import { IconAction, type IconAction as IconActionValue } from '../../enums';
import { kebabToCamel } from '../../scripts/caseConverters.js';
import WtIconAction from '../wt-icon-action/wt-icon-action.vue';
import {
	sectionActionsOrder,
	tableActionsOrder,
} from './WtActionBarActionsOrder.js';

type SortOrder = 'asc' | 'desc' | null;

const props = defineProps({
	/**
	 * [`'table'`, `'section'`]
	 */
	mode: {
		type: String as PropType<'table' | 'section'>,
		default: 'table',
		validator: (v: string) =>
			[
				'table',
				'section',
			].includes(v),
	},

	/**
	 * Not implemented
	 */
	size: {
		type: String,
	},

	/**
	 * Leave the default value for the mode only listed in includes prop
	 */
	include: {
		type: Array as PropType<IconActionValue[]>,
		default: () => [],
	},

	/**
	 * Leave the default values for the mode, except for those in exclude prop
	 */
	exclude: {
		type: Array as PropType<IconActionValue[]>,
		default: () => [],
	},

	'sort:order': {
		type: String as unknown as PropType<SortOrder>,
		default: null,
		required: false,
		validator: (v: SortOrder) =>
			[
				'asc',
				'desc',
				null,
			].includes(v),
	},

	/**
	 * Built dynamically on `disabled:[IconAction]` pattern for all available [IconActions](../../enums/IconAction/Readme.md).
	 */
	disabled: {
		type: Boolean,
		default: false,
	},

	/**
	 * Vue SFC cannot resolve mapped types over imported `typeof` aliases, so
	 * `disabled:*` stay runtime-declared (same as pre-TS version).
	 */
	...Object.values(IconAction).reduce(
		(acc, action) => {
			acc[`disabled:${action}`] = {
				type: Boolean,
				default: false,
			};
			return acc;
		},
		{} as Record<
			`disabled:${IconActionValue}`,
			{
				type: BooleanConstructor;
				default: false;
			}
		>,
	),
});

const emit = defineEmits(
	Object.values(IconAction).map((action) => `click:${action}` as const),
);

const shownActions = computed(() => {
	const actionsOrder =
		props.mode === 'section' ? sectionActionsOrder : tableActionsOrder;

	if (props.include.length)
		return actionsOrder.filter((action) => props.include.includes(action));

	if (props.exclude.length)
		return actionsOrder.filter((action) => !props.exclude.includes(action));

	return actionsOrder;
});

const handleActionClick = (action: IconActionValue) => {
	emit(`click:${action}`);
};

const isActionDisabled = (action: IconActionValue): boolean => {
	const key = `disabled:${kebabToCamel(action)}` as keyof typeof props;
	return Boolean(props[key]);
};

const getActionProps = (action: IconActionValue) => {
	switch (action) {
		case IconAction.SORT:
			return {
				'sort:order': props['sort:order'] ?? undefined,
			};
		default:
			return {};
	}
};
</script>

<style scoped>
.wt-action-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
