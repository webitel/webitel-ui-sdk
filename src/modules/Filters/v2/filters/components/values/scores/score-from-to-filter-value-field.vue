<template>
  <div class="score-from-to-filter-value-field">
    <wt-input
      v-if="model"
      :value="model.from"
      :number-max="props.numberMax"
      :number-min="0"
      :v="v$.model?.from"
      :label="`${t('webitelUI.filters.filterValueFrom')}:`"
      :placeholder="t('webitelUI.filters.filterValue')"
      class="score-from-to-filter-value-field__input"
      name="score-from-to-filter-value-field-from"
      type="number"
      @input="handleInput('from', $event)"
    />

    <wt-input
      v-if="model"
      :value="model.to"
      :number-max="props.numberMax"
      :number-min="0"
      :v="v$.model?.to"
      :label="`${t('reusable.to').toLowerCase()}:`"
      :placeholder="t('webitelUI.filters.filterValue')"
      class="score-from-to-filter-value-field__input"
      name="score-from-to-filter-value-field-to"
      type="number"
      @input="handleInput('to', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

type ModelValue = {
  from: number;
  to: number;
};
const model = defineModel<ModelValue>();
if (!model.value) {
  model.value = {
    from: null,
    to: null,
  };
}

const props = defineProps<{
  numberMax: number;
}>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

const { t } = useI18n();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      from: {
        required,
      },
      to: {
        required,
      },
    },
  })),
  { model },
  { $autoDirty: true },
);
v$.value.$touch();

const handleInput = (key: keyof ModelValue, value: number) => {
  const newValue = { ...model.value };
  newValue[key] = value;
  model.value = newValue;
};

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.score-from-to-filter-value-field {
  display: flex;
  align-items: center;
  grid-gap: var(--spacing-xs);
}
</style>
