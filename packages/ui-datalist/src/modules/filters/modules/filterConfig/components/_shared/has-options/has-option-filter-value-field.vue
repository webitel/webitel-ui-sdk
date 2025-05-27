<template>
  <wt-select
    :clearable="clearable"
    :label="!hideLabel && t('webitelUI.filters.filterValue')"
    :options="BooleanOptions"
    :placeholder="placeholder"
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

const model = defineModel<boolean | null>();

const props = defineProps<{
  placeholder: string;
  clearable: boolean;
  hideLabel: boolean;
}>();

const attrs = useAttrs();

const { t } = useI18n();

const strModel = computed({
  get: () => {
    return typeof model.value === 'boolean' ? String(model.value) : model.value;
  },
  set: (value: string) => {
    model.value = value === 'true' ? true : value === 'false' ? false : null;
  },
});
</script>

<style scoped></style>
