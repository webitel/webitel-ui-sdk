<template>
  <wt-select
    :close-on-select="false"
    :label="labelValue"
    :search-method="props.filterConfig.searchRecords"
    :v="!disableValidation && v$?.model?.list"
    :value="model?.list"
    multiple
    track-by="id"
    use-value-from-options-by-prop="id"
    v-bind="$attrs"
    @input="changeListValue"
  />
  <wt-checkbox
    v-if="!props.filterConfig?.hideUnassigned"
    :label="t('reusable.showUnassigned')"
    :selected="model?.unassigned"
    :v="!disableValidation && v$?.model?.unassigned"
    @change="model.unassigned = $event"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { requiredIf } from '@vuelidate/validators';
import { WtSelect } from '@webitel/ui-sdk/components';
import { WtCheckbox } from '@webitel/ui-sdk/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { IContactGroupFilterConfig } from './index';

const props = defineProps<{
  filterConfig: IContactGroupFilterConfig;
  disableValidation?: boolean;
  hideLabel?: boolean;
}>();

type ModelValue = {
  list: string[];
  unassigned: boolean;
};

const model = defineModel<ModelValue>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();
const { t } = useI18n();

const labelValue = computed(() => props?.hideLabel ? null : t('webitelUI.filters.filterValue'))

const changeListValue = (event) => {
  if(!event.length && !model.value.unassigned) {

    return model.value = {}
  } else {
    model.value = {
      ...model.value,
      list: event,
    };
  }
};
const v$ =  useVuelidate(
    computed(() => ({
      model: {
        list: { required: requiredIf(() => !model.value.unassigned) },
        unassigned: {
          required: requiredIf(() =>
            props.filterConfig?.hideUnassigned && !model.value.list.length
          ),
        },
      },
    })),
    { model },
    { $autoDirty: true }
);

onMounted(() => {
  if(!props?.disableValidation) v$.value.$touch();
});

watch(
  () => v$?.value?.$invalid,
  (invalid) => {
    if (v$?.value) {
      emit('update:invalid', invalid);
    }
  },
  { immediate: true });
</script>

<style scoped></style>
