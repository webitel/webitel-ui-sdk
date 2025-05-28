<template>
  <wt-select
    :label="labelValue"
    :options="BooleanOptions"
    :value="strModel"
    class="has-option-filter-value-field"
    track-by="value"
    use-value-from-options-by-prop="value"
    v-bind="attrs"
    @input="strModel = $event"
  />
</template>

<script lang="ts" setup>
import { WtSelect } from '@webitel/ui-sdk/components';
import { computed, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

import { BooleanOptions } from '../../../enums/options/BooleanFilterOptions';

const props = defineProps<{
  hideLabel?: boolean;
}>();

const model = defineModel<boolean | null>();

const attrs = useAttrs();

const { t } = useI18n();

const labelValue = computed(() => props?.hideLabel ? null : t('webitelUI.filters.filterValue'))

const strModel = computed({
  get: () => {
    return typeof model.value === 'boolean' ? String(model.value) : model.value;
  },
  set: (value: string) => {
    model.value = value;
  },
});
</script>

<style scoped></style>
