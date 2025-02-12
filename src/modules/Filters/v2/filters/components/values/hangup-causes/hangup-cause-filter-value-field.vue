<template>
  <wt-select
    :clearable="false"
    :options="HangupCauseOptions"
    :value="model"
    :label="t('')"
    multiple
    class="hangup-cause-filter-value-preview"
    track-by="value"
    use-value-from-options-by-prop="value"
    @input="model = $event"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import WtSelect from '../../../../../../../components/wt-select/wt-select.vue';
import { HangupCauseOptions } from '../../enums/hangup-cause-options';

const model = defineModel<string>();
const { t } = useI18n();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required,
    },
  })),
  { model },
  { $autoDirty: true },
);

v$.value.$touch();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
