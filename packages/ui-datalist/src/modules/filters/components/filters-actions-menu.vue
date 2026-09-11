<template>
  <div class="filters-actions-menu">
    <wt-context-menu
      :disabled="isMenuDisabled"
      :options="options"
      @click="onOptionClick"
    >
      <template #activator="{ toggle, show }">
        <span
          class="filters-actions-menu__activator"
          @pointerenter="show($event)"
        >
          <wt-badge :hidden="!hasAnyFilters">
            <wt-icon-action
              :action="IconAction.FILTERS"
              :disabled="isMenuDisabled"
              @click="toggle($event)"
            />
          </wt-badge>
        </span>
      </template>
    </wt-context-menu>

    <!-- preset popups; their own icons are hidden, the menu opens them -->
    <div
      v-if="enablePresets && presetStore"
      class="filters-actions-menu__preset-actions"
    >
      <apply-preset-action
        ref="applyPreset"
        :filter-configs="filterConfigs"
        :has-any-filters="hasAnyFilters"
        :namespace="presetNamespace ?? ''"
        :presets-store="presetStore"
        @apply="emit('preset:apply', $event)"
        @restore="emit('preset:restore', $event)"
      />

      <save-preset-action
        ref="savePreset"
        :filter-configs="filterConfigs"
        :filters-included="filtersIncluded"
        :filters-manager="filtersManager"
        :namespace="presetNamespace ?? ''"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DataField } from '@webitel/api-services/gen/models';
import {
	WtBadge,
	WtContextMenu,
	WtIconAction,
} from '@webitel/ui-sdk/components';
import { IconAction } from '@webitel/ui-sdk/enums';
import type { StoreGeneric } from 'pinia';
import { computed, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

import { ApplyPresetAction, SavePresetAction } from '../../filter-presets';
import type { IFiltersManager } from '../classes/FiltersManager';
import { useFilterConfigsToolkit } from '../composables/useFilterConfigsToolkit';
import { useSelectedFilters } from '../composables/useSelectedFilters';
import type { FilterConfigDefinition } from '../modules/filterConfig/types/FilterConfigDefinition';

/**
 * Filter actions for pages without a filters panel (column filters only, WTEL-7727):
 * the "filters" icon with a badge when filters are applied, and a context menu
 * with reset + presets (when `presetNamespace` is given) — the same actions the panel has.
 * Only emits, like the panel; the page binds them to its table store.
 */
const props = defineProps<{
	filtersManager: IFiltersManager;
	filterOptions: FilterConfigDefinition[];
	filterableExtensionFields?: DataField[];
	/** enables preset actions */
	presetNamespace?: string;
	usePresetsStore?: () => StoreGeneric;
}>();

const emit = defineEmits<{
	'filter:reset-all': [];
	'preset:apply': [
		string,
	];
	'preset:restore': [
		string,
	];
}>();

const { t } = useI18n();

const applyPreset =
	useTemplateRef<InstanceType<typeof ApplyPresetAction>>('applyPreset');
const savePreset =
	useTemplateRef<InstanceType<typeof SavePresetAction>>('savePreset');

const { filterConfigs, filtersIncluded } = useFilterConfigsToolkit({
	filterOptions: props.filterOptions,
	filtersManager: props.filtersManager,
	filterableExtensionFields: props.filterableExtensionFields,
});

const { listSelectedFilters, hasAnyFilters } = useSelectedFilters({
	filtersManager: () => props.filtersManager,
	filterOptions: () => props.filterOptions,
	filterableExtensionFields: () => props.filterableExtensionFields,
	filterConfigs,
});

const enablePresets = computed(() => !!props.presetNamespace);
const presetStore = props.usePresetsStore ? props.usePresetsStore() : null;

const MenuAction = {
	RESET: 'reset',
	APPLY_PRESET: 'apply-preset',
	SAVE_PRESET: 'save-preset',
} as const;

const hasFiltersToReset = computed(() => !!listSelectedFilters.value.size);

// reset is the only action without presets: then there is nothing to open the menu for
const isMenuDisabled = computed(
	() => !enablePresets.value && !hasFiltersToReset.value,
);

const options = computed(() => [
	{
		action: MenuAction.RESET,
		text: t(`webitelUI.iconAction.hints.${IconAction.CLEAR}`),
		disabled: !hasFiltersToReset.value,
	},
	...(enablePresets.value
		? [
				{
					action: MenuAction.APPLY_PRESET,
					text: t(`webitelUI.iconAction.hints.${IconAction.APPLY_PRESET}`),
					disabled: false,
				},
				{
					action: MenuAction.SAVE_PRESET,
					text: t(`webitelUI.iconAction.hints.${IconAction.SAVE_PRESET}`),
					disabled: !!savePreset.value?.disabled,
				},
			]
		: []),
]);

const onOptionClick = ({
	option,
}: {
	option: (typeof options.value)[number];
}) => {
	if (option.disabled) return;

	switch (option.action) {
		case MenuAction.RESET:
			emit('filter:reset-all');
			presetStore?.resetPreset();
			break;
		case MenuAction.APPLY_PRESET:
			applyPreset.value?.open();
			break;
		case MenuAction.SAVE_PRESET:
			savePreset.value?.open();
			break;
	}
};
</script>

<style lang="scss" scoped>
.filters-actions-menu__activator {
  display: inline-flex;
}

// popups stay rendered, only the actions' own icons are hidden
.filters-actions-menu__preset-actions :deep(> * > .wt-icon-action) {
  display: none;
}
</style>
