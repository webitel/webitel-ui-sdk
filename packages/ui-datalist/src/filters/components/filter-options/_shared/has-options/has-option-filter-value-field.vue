<template>
  <wt-select
    v-bind="attrs"
    :clearable="false"
    :options="BooleanOptions"
    :value="strModel"
    :label="t('webitelUI.filters.filterValue')"
    class="has-option-filter-value-field"
    track-by="value"
    use-value-from-options-by-prop="value"
    @input="strModel = $event"
  />
</template>

<script lang="ts" setup>
import { WtSelect } from '@webitel/ui-sdk/components';
import { computed, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

import { BooleanOptions } from '../../../../enums/boolean-options';

const model = defineModel<boolean | null>();

const attrs = useAttrs();

const { t } = useI18n();

const strModel = computed({
  get: () => {
    return typeof model.value === 'boolean' ? String(model.value) : model.value;
  },
  set: (value: string) => {
    model.value = value === 'true';
  },
});
</script>

<style scoped></style>
