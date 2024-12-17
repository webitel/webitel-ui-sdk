<template>
  <section class="dynamic-filter-setup-form">
    <header>
      Tttitleee
    </header>
    <form>
      <wt-select
        :value="selectedFilterValue"
        :label="'fffilter nnname'"
        :disabled="selected"
        :options="options"
        @input="selectedFilterValue = $event"
      />
      <dynamic-filter-form-value-field
        v-if="selectedFilterValue"
        v-model="filterValue"
        :key="selectedFilterValue.name"
        v-bind="selectedFilterValue"
      />
    </form>
    <footer>
      <wt-button
        @click="submit"
      >
        sssubmittt
      </wt-button>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import {ref, type Ref, watch} from "vue";
import DynamicFilterFormValueField from "./dynamic-filter-form-value-field.vue";
import type {FilterSetupData} from "../../../types/FilterSetup.type.ts";
import WtSelect from "../../../../../../../components/wt-select/wt-select.vue";
import WtButton from "../../../../../../../components/wt-button/wt-button.vue";
import type {FilterInitParams} from "../../../classes/Filter.class.ts";

interface PropsWithOptions {
  options: FilterSetupData[]
}

interface PropsWithSelected {
  selected: FilterSetupData;
}

// one of is required
type Props = PropsWithOptions | PropsWithSelected;

const props = withDefaults(
  defineProps<Props>(),
  {
    options: () => [],
  },
);

const emit = defineEmits<{
  submit: [FilterInitParams],
}>();

// TODO: fix lint err
const selectedFilterValue: Ref<FilterSetupData> = ref(props.selected || props.options[0]);

const filterValue = ref();

const submit = () => {
  emit('submit', {
    name: selectedFilterValue.value.name,
    value: filterValue.value,
  });
};

watch(selectedFilterValue, (selected) => {
  filterValue.value = selected.defaultValue;
}, { immediate: true });

</script>

<style lang="scss" scoped>

</style>
