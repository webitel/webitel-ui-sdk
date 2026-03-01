<template>
  <wt-icon-btn
    v-tooltip="t(iconAction.hint, iconAction.hintParams)"
    :disabled="disabled"
    :icon="iconAction.icon"
    :size="size"
    @click="emit('click', $event)"
    @mousedown="emit('mousedown', $event)"
  />
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import IconAction from '../../enums/IconAction/IconAction.enum.js';
import { SortSymbols } from '../../scripts/sortQueryAdapters.js';
import { WtIconActionIconMappings } from './iconMappings.js';

const props = defineProps({
	/**
	 * `IconAction` enum value
	 */
	action: {
		type: String,
		required: true,
		validator: (v) =>
			Object.values([
				IconAction.DELETE,
				IconAction.EDIT,
				IconAction.ADD,
				IconAction.HISTORY,
				IconAction.DOWNLOAD,
				IconAction.REFRESH,
				IconAction.SAVE,
				IconAction.CANCEL,
				IconAction.SAVE_PRESET,
				IconAction.APPLY_PRESET,
				IconAction.ADD_CONTACT,
				IconAction.DOWNLOAD_PDF,
				IconAction.CHAT,
				IconAction.SORT,
			]).includes(v),
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String,
		default: 'md',
		required: false,
	},
	sortOrder: {
		type: String,
		default: null,
		validator: (v) => Object.values(SortSymbols).includes(v),
	},
});

const emit = defineEmits([
	'click',
	'mousedown',
]);

const { t } = useI18n();

const iconAction = computed(() => {
	if (props.action === IconAction.SORT) {
		const icon =
			props.sortOrder === SortSymbols.DESC ? 'sort-desc' : 'sort-asc';
		return {
			icon,
			hint: 'webitelUI.iconAction.hints.sort',
			hintParams: {
				order: props.sortOrder,
			},
		};
	}

	const icon = WtIconActionIconMappings[props.action];

	if (!icon) {
		console.error(
			`Unknown action for wt-icon-action component: ${props.action}`,
		);
		return {
			icon: 'edit',
			hint: props.action,
		};
	}

	return {
		icon,
		hint: `webitelUI.iconAction.hints.${props.action}`,
	};
});
</script>


