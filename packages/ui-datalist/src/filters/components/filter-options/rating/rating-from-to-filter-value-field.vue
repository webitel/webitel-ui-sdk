<template>
  <div class="rating-from-to-filter-value-field">
    <wt-input
      v-if="model"
      :label="`${t('reusable.from')}:`"
      :number-min="0"
      :placeholder="t('webitelUI.filters.filterValue')"
      :v="v$.model?.from"
      :value="model.from"
      class="rating-from-to-filter-value-field__input"
      type="number"
      @input="handleInput('from', $event)"
    />

    <wt-input
      v-if="model"
      :label="`${t('reusable.to')}:`"
      :number-min="0"
      :placeholder="t('webitelUI.filters.filterValue')"
      :v="v$.model?.to"
      :value="model.to"
      class="rating-from-to-filter-value-field__input"
      type="number"
      @input="handleInput('to', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { maxValue, requiredIf } from '@vuelidate/validators';
import { WtInput } from '@webitel/ui-sdk/components';
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

const v$ = useVuelidate(
  computed(() => ({
    model: {
      from: {
        required: requiredIf(() => !model.value.to),
        maxValue: maxValue(
          model?.value?.to && model.value.from > model.value.to
            ? model.value.to
            : Infinity,
        ),
      },
      to: {
        required: requiredIf(() => !model.value.from),
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
.rating-from-to-filter-value-field {
  display: flex;
  align-items: center;
  grid-gap: var(--spacing-xs);

  &__input {
    flex: 1;
  }
}
</style>
