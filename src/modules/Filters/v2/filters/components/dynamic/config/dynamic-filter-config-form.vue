<template>
  <section class="dynamic-filter-config-form">
    <header>Tttitleee</header>
    <form>
      <wt-select
        :value="filterName"
        :label="'fffilter nnname'"
        :disabled="editMode"
        :options="options"
        use-value-from-options-by-prop="value"
        @input="filterName = $event"
      />
      <wt-input
        v-model="filterLabel"
        :label="'label goes here'"
        @input="touchedLabel = true"
      />
      <div
        v-if="filterName"
        class=""
      >
        <slot
          name="value-input"
          v-bind="{
            filterName,
            filterValue,
            onValueChange: (v) => (filterValue = v),
            onValueInvalidChange: (v) => (invalid = v),
          }"
        />
      </div>
    </form>
    <footer>
      <wt-button
        :disabled="invalid"
        @click="submit"
      >
        sssubmittt
      </wt-button>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import deepcopy from 'deep-copy';
import { ref, watch } from 'vue';

import WtButton from '../../../../../../../components/wt-button/wt-button.vue';
import WtInput from '../../../../../../../components/wt-input/wt-input.vue';
import WtSelect from '../../../../../../../components/wt-select/wt-select.vue';
import type {
  FilterInitParams,
  FilterName,
  IFilter,
} from '../../../types/Filter.types.ts';

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
}>();

const filterName = ref();
const filterLabel = ref('');
const filterValue = ref();

// if user have not changed label yet, it will be changed with selected filterName
const touchedLabel = ref(false);

const editMode = !!props.filter;

const invalid = ref(false);

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

<style lang="scss" scoped></style>
