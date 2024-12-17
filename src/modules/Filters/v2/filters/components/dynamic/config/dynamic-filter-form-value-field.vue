<template>
  <component
    :is="fieldComponent"
    v-bind="fieldProps"
    class="dynamic-filter-form-value-field"
    v-on="fieldListeners"
  />
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import {type FilterSetupData, FilterType} from "../../../types/FilterSetup.type.ts";
import WtInput from "../../../../../../../components/wt-input/wt-input.vue";
import WtSelect from "../../../../../../../components/wt-select/wt-select.vue";
import WtDatepicker from "../../../../../../../components/wt-datepicker/wt-datepicker.vue";

const model = defineModel<unknown>();

const props = defineProps<FilterSetupData>();

const { t } = useI18n();

const fieldComponent = computed(() => {
  switch (props.type) {
    case FilterType.Enum:
      return WtSelect;
    case FilterType.Timestamp:
      return WtDatepicker;
    default: return WtInput;
  }
});

const fieldProps = computed(() => {
  const label = t('vvvalueee');
  const multiple = props.multiple;

  const rest = {};

  switch (props.type) {
    case FilterType.Enum:
      Object.assign(rest, {
        options: props.options,
      });
      break;


    case FilterType.SystemEntity:
      Object.assign(rest, {
        search: props.search,
      });
      break;

    case FilterType.Timestamp:
      break;

    case FilterType.Numeric:
      break;

    default:
  }

  return {
    label,
    multiple,
    value: model.value,
    ...rest,
  };
});

const fieldListeners = computed(() => {
  return {
    input: (value: unknown) => {
      model.value = value;
    },
  };
});
</script>

<style scoped lang="scss">
//.dynamic-filter-form-value-field {
//
//}
</style>
