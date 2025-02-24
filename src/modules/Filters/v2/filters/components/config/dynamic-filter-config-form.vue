<template>
  <form
    :class="{
      [`dynamic-filter-config-form__${formFilterStyles}`]: true,
    }"
    class="dynamic-filter-config-form"
  >
    <div class="dynamic-filter-config-form__content">
      <wt-select
        :clearable="false"
        :disabled="editMode"
        :label="t('webitelUI.filters.filterName')"
        :options="options"
        :value="filterName"
        track-by="value"
        use-value-from-options-by-prop="value"
        class="dynamic-filter-config-form__column-select"
        @input="onFilterNameUpdate($event)"
      />

      <div class="dynamic-filter-config-form__value-select">
        <slot
          name="value-input"
          v-bind="{
            filterName,
            filterValue,
            inputLabel: t('webitelUI.filters.filterValue'),
            onValueChange: (v) => (filterValue = v),
            onValueInvalidChange: (v) => (invalid = v),
          }"
        />
      </div>

      <dynamic-filter-config-form-label
        :value="filterLabel"
        class="dynamic-filter-config-form__label"
        @update:model-value="onLabelValueUpdate"
        @update:invalid="(v) => (invalid = v)"
      />
    </div>

    <footer class="dynamic-filter-config-form-footer">
      <wt-button
        :disabled="invalid"
        wide
        @click="submit"
      >
        {{ t('reusable.save') }}
      </wt-button>

      <wt-button
        color="secondary"
        wide
        @click="emit('cancel')"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </footer>
  </form>
</template>

<script lang="ts" setup>
import deepcopy from 'deep-copy';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import WtButton from '../../../../../../components/wt-button/wt-button.vue';
import WtSelect from '../../../../../../components/wt-select/wt-select.vue';
import type { FilterInitParams, FilterName, IFilter } from '../../types/Filter';
import DynamicFilterConfigFormLabel from './dynamic-filter-config-form-label.vue';

interface FilterNameSelectRepresentation {
  name: string;
  value: FilterName;
}

interface AddModeProps {
  options: Array<FilterNameSelectRepresentation>;
}

interface EditModeProps {
  filter: IFilter;
}

type Props = AddModeProps | EditModeProps;

const props = defineProps<Props>();

const emit = defineEmits<{
  submit: [FilterInitParams];
  cancel: [];
}>();

const { t } = useI18n();

const filterName = ref();
const filterLabel = ref('');
const filterValue = ref();

const editMode = !!props.filter;

const invalid = ref(false);

const onLabelValueUpdate = (val: string) => {
  filterLabel.value = val;
};

const onFilterNameUpdate = (val: string) => {
  filterName.value = val;
  filterValue.value = null;
};

const submit = () => {
  emit('submit', {
    name: filterName.value,
    label: filterLabel.value,
    value: filterValue.value,
  });
};

if (props.filter) {
  watch(
    props.filter,
    () => {
      filterName.value = props.filter.name;
      filterValue.value = deepcopy(props.filter.value);
      filterLabel.value = props.filter.label;
    },
    { immediate: true },
  );
}

const formFilterStyles = computed(() => {
  const DEFAULT_SIZE = 'xs';
  if (props.filter) {
    return props.filter?.styleOptions?.size || DEFAULT_SIZE;
  }

  if (props.options) {
    const match = props.options?.find((el) => el.value === filterName.value);
    return match?.styleOptions?.size || DEFAULT_SIZE;
  }

  return DEFAULT_SIZE;
});
</script>

<style lang="scss" scoped>
$form-width-xs: 380px;
$form-width-md: 800px;

.dynamic-filter-config-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: var(--spacing-xs) 0;
  gap: var(--spacing-xs);

  &__xs {
    width: $form-width-xs;

    .dynamic-filter-config-form {
    }
  }

  &__md {
    width: $form-width-md;
    height: 500px;

    .dynamic-filter-config-form {
      &__content {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto 1fr;
        grid-template-areas:
          'column label'
          'value value';
      }
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'column'
      'value'
      'label';
    height: 100%;
    padding: var(--spacing-xs) 0;
    grid-gap: var(--spacing-xs);
  }

  &__column-select {
    grid-area: column;
    height: fit-content;
  }

  &__value-select {
    grid-area: value;
    height: 100%;
  }

  &__label {
    grid-area: label;
    height: fit-content;
  }

  &-footer {
    display: flex;
    gap: var(--spacing-xs);
  }
}
</style>
