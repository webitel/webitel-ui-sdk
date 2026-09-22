<template>
  <wt-datepicker
    v-if="model"
    :label="labelValue"
    v-model:model-value="model"
    show-time
  />
</template>

<script lang="ts" setup>
import { endOfToday } from 'date-fns';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';

const model = defineModel<number>();
const { t } = useI18n();

const props = defineProps<{
	filterConfig?: WtSysTypeFilterConfig;
}>();

const labelValue = computed(() => {
	const value = props?.filterConfig?.showFilterName
		? props?.filterConfig.name
		: 'filterValue';
	return t(`webitelUI.filters.${value}`);
});

if (!model.value) {
	model.value = endOfToday().getTime();
}
</script>

<style scoped></style>
