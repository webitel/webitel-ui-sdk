<template>
  <wt-select
    v-bind="attrs"
    :clearable="false"
    :options="BooleanOptions"
    :value="model"
    :label="t('webitelUI.filters.filterValue')"
    class="has-option-filter-value-field"
    track-by="value"
    use-value-from-options-by-prop="value"
    @input="model = $event"
  />
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

import WtSelect from '../../../../../../../../components/wt-select/wt-select.vue';
import { BooleanOptions } from '../../../enums/boolean-options';

const model = defineModel<string>();

const attrs = useAttrs();

const { t } = useI18n();
</script>

<style lang="scss" scoped></style>
