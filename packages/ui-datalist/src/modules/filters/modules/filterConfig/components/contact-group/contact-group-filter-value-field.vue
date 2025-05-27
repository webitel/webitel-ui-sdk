<template>
  <wt-select
    :close-on-select="false"
    :label="!filterConfig.hideLabel && t('webitelUI.filters.filterValue')"
    :placeholder="filterConfig.hideLabel && filterConfig.label"
    :search-method="props.filterConfig.searchRecords"
    :v="v$?.model.list"
    :value="model?.list"
    multiple
    track-by="id"
    use-value-from-options-by-prop="id"
    @input="inputModelList"
  />
  <wt-checkbox
    v-if="!props.filterConfig?.hideUnassigned"
    :label="t('reusable.showUnassigned')"
    :selected="model?.unassigned"
    :v="v$?.model.unassigned"
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

const initModel = () => {
  if (!model.value) {
    model.value = {
      list: [],
      unassigned: false,
    };
  }
};
onMounted(() => initModel());

const inputModelList = (event) => {
  model.value = {
    ...model.value,
    list: event,
  };
};

const v$ = computed(() => {
  if (props.filterConfig?.noValidation) return null;
  return useVuelidate(
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
});
watch(
  v$,
  (v) => {
    if (v) v.value.$touch();
  },
  { immediate: true });

watch(
  () => v$?.value?.$invalid,
  (invalid) => {
    if (v$?.value) {
      emit('update:invalid', invalid);
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>
