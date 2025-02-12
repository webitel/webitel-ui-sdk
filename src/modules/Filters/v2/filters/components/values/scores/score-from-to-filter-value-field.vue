<template>
  <div class="filter-from-to">
    <wt-input
      v-model="model.from"
      :number-max="props.numberMax"
      :number-min="0"
      :v="v$.model?.from"
      :label="`${t('webitelUI.filters.filterValueFrom')}:`"
      class="filter-from-to__input"
      name="filter-from-to-from"
      type="number"
    />

    <wt-input
      v-model="model.to"
      :number-max="props.numberMax"
      :number-min="0"
      :v="v$.model?.to"
      :label="`${t('reusable.to').toLowerCase()}:`"
      class="filter-from-to__input"
      name="filter-from-to-to"
      type="number"
    />
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

type ModelValue = {
  from: string;
  to: string;
};
const model = defineModel<ModelValue>();

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

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.filter-from-to {
  &:hover > .wt-label {
    color: var(--form-label--hover-color);
  }

  &:focus-within > .wt-label {
    color: var(--form-label--active-color);
  }
}

.filter-from-to__inputs-wrapper,
.filter-from-to__input-wrapper {
  display: flex;
  align-items: center;
}

.filter-from-to__input-label {
  @extend %typo-subtitle-1;
  margin-right: 5px;
}

.filter-from-to__input-wrapper {
  &:focus-within .wt-label {
    color: var(--form-label--active-color);
  }

  .filter-from-to-input {
    width: 70px;
  }

  &:first-child {
    margin-right: 10px;
  }
}
</style>
