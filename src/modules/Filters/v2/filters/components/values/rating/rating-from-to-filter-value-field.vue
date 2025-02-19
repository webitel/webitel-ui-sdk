<template>
  <div class="rating-from-to-filter-value-field">
    <wt-input
      v-if="model"
      :value="model.from"
      :number-min="0"
      :number-max="numberMax"
      :v="v$.model?.from"
      :label="`${t('webitelUI.filters.filterValueFrom')}:`"
      :placeholder="t('webitelUI.filters.filterValue')"
      class="rating-from-to-filter-value-field__input"
      name="rating-from"
      type="number"
      @input="handleInput('from', $event)"
    />

    <wt-input
      v-if="model"
      :value="model.to"
      :number-min="0"
      :v="v$.model?.to"
      :label="`${t('reusable.to').toLowerCase()}:`"
      :placeholder="t('webitelUI.filters.filterValue')"
      class="rating-from-to-filter-value-field__input"
      name="rating-to"
      type="number"
      @input="handleInput('to', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { maxValue, requiredIf } from '@vuelidate/validators';
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

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

const { t } = useI18n();

const numberMax = computed(() =>
  model.value.to > 0 ? model.value.to : undefined,
);

const v$ = useVuelidate(
  computed(() => ({
    model: {
      from: {
        requiredIf: requiredIf(() => !model.value.to),
        maxValue: model.value?.to ? maxValue(model.value.to) : true,
      },
      to: { requiredIf: requiredIf(() => !model.value.from) },
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
.rating-from-to-filter-value-field {
  display: flex;
  align-items: center;
  grid-gap: var(--spacing-xs);

  &__input {
    width: 100%;
  }
}
</style>
