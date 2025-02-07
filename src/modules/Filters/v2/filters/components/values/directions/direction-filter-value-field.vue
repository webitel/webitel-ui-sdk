<template>
  <wt-select
    v-bind="attrs"
    :clearable="false"
    :options="DirectionOptions"
    :value="model"
    :label="t('vocabulary.labels', 1)"
    class="direction-filter-value-field"
    track-by="value"
    use-value-from-options-by-prop="value"
    @input="model = $event"
  />
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

import DirectionOptions from '../../../enums/DirectionOptions.enum.js';

const model = defineModel<string>();
const { t } = useI18n();
const attrs = useAttrs();
</script>

<style lang="scss" scoped></style>
