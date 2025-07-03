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
  <slot
    v-else-if="field.kind === FieldType.Boolean"
    :name="FieldType.Boolean"
    :default-props="{ ...sharedChildrenProps }"
  >
    <wt-switcher
      v-bind="sharedChildrenProps"
      :value="value"
      @change="setValue"
    />
  </slot>
  <slot
    v-else-if="field.kind === FieldType.Select"
    :name="FieldType.Select"
    :default-props="{
        ...sharedChildrenProps,
        ...selectProps,
        value,
      }"
  >
  <wt-select
    v-bind="sharedChildrenProps"
    :value="value"
    :search-method="loadLookupList(field.lookup)"
    track-by="id"
    clearable
    @input="selectElement"
  />
  </slot>
  <slot
    v-else-if="field.kind === FieldType.Multiselect"
    :name="FieldType.Multiselect"
    :default-props="{
      ...sharedChildrenProps,
      ...multiselectProps,
      value,
    }"
  >
    <wt-select
      v-bind="{ ...sharedChildrenProps, ...multiselectProps }"
      :value="value"
      @input="selectElements"
    />
  </slot>
  <slot
    v-else-if="field.kind === FieldType.Calendar"
    :name="FieldType.Calendar"
    :default-props="{
      ...sharedChildrenProps,
      value,
    }"
  >
    <wt-datepicker
      v-bind="sharedChildrenProps"
      :value="value"
      mode="datetime"
      @input="setValue"
    />
  </slot>
</template>

<script lang="ts" setup>
import { SysTypesAPI } from "@webitel/api-services/api";
import { WtDatepicker, WtInput,WtSelect, WtSwitcher } from '@webitel/ui-sdk/components';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { WebitelProtoDataField } from 'webitel-sdk';

import { WtTypeExtensionFieldKind as FieldType } from '../../../enums';

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

/**
 * @author @dlohvinov
 *
 * props as computed is needed to pass it either
 * to slot and to default in-slot component
 */
const selectProps = computed(() => ({
  clearable: true,
  trackBy: 'id',
  searchMethod: () => loadLookupList(props.field.lookup),
}));

const multiselectProps = computed(() => ({
  ...selectProps.value,
  multiple: true,
}));

const setValue = (value) => {
  model.value = value;
};

const loadLookupList = ({ path, display, primary }) => {
  return (params) => {
    return SysTypesAPI.getSysTypeRecordsLookup({
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
