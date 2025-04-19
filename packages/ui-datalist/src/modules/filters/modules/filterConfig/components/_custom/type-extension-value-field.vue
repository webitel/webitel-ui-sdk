<template>
  <wt-input
    v-if="field.kind === FieldType.Text"
    v-bind="sharedChildrenProps"
    :value="value"
    @input="setValue"
  />
  <wt-input
    v-else-if="field.kind === FieldType.Number"
    v-bind="sharedChildrenProps"
    :value="value"
    type="number"
    @input="setValue"
  />
  <wt-switcher
    v-else-if="field.kind === FieldType.Boolean"
    v-bind="sharedChildrenProps"
    :value="value"
    @change="setValue"
  />
  <wt-select
    v-else-if="field.kind === FieldType.Select"
    v-bind="sharedChildrenProps"
    :value="value"
    :search-method="loadLookupList(field.lookup)"
    track-by="id"
    clearable
    @input="selectElement"
  />
  <wt-select
    v-else-if="field.kind === FieldType.Multiselect"
    v-bind="sharedChildrenProps"
    :value="value"
    :search-method="loadLookupList(field.lookup)"
    track-by="id"
    clearable
    multiple
    @input="selectElements"
  />
  <wt-datepicker
    v-else-if="field.kind === FieldType.Calendar"
    v-bind="sharedChildrenProps"
    :value="value * DatetimeConversionModifier"
    mode="datetime"
    @input="setValue(+$event / DatetimeConversionModifier)"
  />
</template>

<script lang="ts" setup>
import { WtDatepicker, WtInput,WtSelect, WtSwitcher } from '@webitel/ui-sdk/components';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { WebitelProtoDataField } from 'webitel-sdk';

import { getSysTypeRecordsLookup } from "../../../../../../../../../src/api/clients/wtTypes/sysTypes/sysTypes";
import { ExtensionFieldType as FieldType } from "./FieldType";

// TODO: move to api file, mb? 🤔
//  Number for convert time from seconds to milliseconds, when send to backend and display on frontend
const DatetimeConversionModifier = 1000;

const model = defineModel<unknown>();

const props = defineProps<{
  field: WebitelProtoDataField;
  required?: boolean;
  /**
   * TODO: implement validation
   */
  v?: object;
}>();

const { t } = useI18n();

const label = computed(() => {
  return t(props.field?.name || 'vocabulary.labels');
});

const isRequired = computed(() => {
  return props.required || props.field.required;
});

const value = computed(() => {
  return model.value;
});

const sharedChildrenProps = computed(() => ({
  label: label.value,
  required: isRequired.value,
  v: props.v,
}));

const setValue = (value) => {
  model.value = value;
};

const loadLookupList = ({ path, display, primary }) => {
  return (params) => {
    return getSysTypeRecordsLookup({
      ...params,
      path,
      display,
      primary,
    });
  };
};

const selectElement = (value) => {
  if (Object.values(value).length === 0) {
    return setValue(null);
  }

  setValue({
    id: value.id,
    name: value.name,
  });
};

const selectElements = (value) => {
  setValue(
    value.map((item) => ({
      id: item.id,
      name: item.name,
    })),
  );
};
</script>
