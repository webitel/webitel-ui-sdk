<template>
  <section class="dynamic-filter-config-form">
    <header>
      Tttitleee
    </header>
    <form>
      <wt-select
        :value="filterName"
        :label="'fffilter nnname'"
        :disabled="editMode"
        :options="options"
        @input="filterName = $event"
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
            onValueChange: (v) => filterValue = v,
            onValueInvalidChange: (v) => invalid = v,
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
import {computed, ref, watch} from "vue";
import WtSelect from "../../../../../../../components/wt-select/wt-select.vue";
import WtButton from "../../../../../../../components/wt-button/wt-button.vue";
import type {FilterInitParams, FilterName, IFilter} from "../../../types/Filter.types.ts";

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
  submit: [FilterInitParams],
}>();

const filterName = ref();
const filterValue = ref();

const editMode = ref(false);

const invalid = ref(false);

const submit = () => {
  emit('submit', {
    name: filterName.value,
    value: filterValue.value,
  });
};

// if (props.options) {
//
// } else if (props.filter) {}

watch(props.options, () => {
  filterName.value = props.options[0]?.value;
  filterValue.value = null;
});

watch(props.filter, () => {
  filterName.value = props.filter.name;
  filterValue.value = props.filter.value;
});
</script>

<style lang="scss" scoped>

</style>
