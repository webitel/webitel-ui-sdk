<template>
  <form class="dynamic-filter-config-form">
    <wt-select
      :disabled="editMode"
      :label="t('webitelUI.filters.filterName')"
      :options="options"
      :value="filterName"
      use-value-from-options-by-prop="id"
      @input="filterName = $event"
    />

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

    <dynamic-filter-config-form-input
      :value="filterLabel"
      @update:value="onLabelValueUpdate"
      @update:invalid="(v) => (invalid = v)"
    />

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
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import WtButton from '../../../../../../../components/wt-button/wt-button.vue';
import WtSelect from '../../../../../../../components/wt-select/wt-select.vue';
import type {
  FilterInitParams,
  FilterName,
  IFilter,
} from '../../../types/Filter';
import DynamicFilterConfigFormInput from './dynamic-filter-config-form-input.vue';

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

// if user have not changed label yet, it will be changed with selected filterName
const touchedLabel = ref(false);

const editMode = !!props.filter;

const invalid = ref(false);

function onLabelValueUpdate(val: string) {
  filterLabel.value = val;
  touchedLabel.value = true;
}

const submit = () => {
  emit('submit', {
    name: filterName.value,
    label: filterLabel.value,
    value: filterValue.value,
  });
};

if (props.options) {
  watch(
    props.options,
    () => {
      filterName.value = props.options[0]?.value;
      filterValue.value = null;

      if (!touchedLabel.value) {
        filterLabel.value = filterName.value;
      }
    },
    { immediate: true },
  );
}

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
</script>

<style lang="scss" scoped>
$form-width: 380px;

.dynamic-filter-config-form {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: $form-width;
  padding: var(--spacing-sm);
  gap: var(--spacing-sm);
}

.dynamic-filter-config-form-footer {
  display: flex;
  gap: var(--spacing-xs);
}
</style>
