<template>
  <wt-search-bar
    :placeholder="t('reusable.search')"
    :search-mode="currentSearchMode"
    :search-mode-options="searchModeOpts"
    :hint="multisearch && currentSearchMode?.hint"
    :value="model"
    :v="multisearch && v$"
    @input="model = $event"
    @search="handleSearch"
    @update:search-mode="onSearchModeChange($event.value)"
  >
    <template
      v-if="props.showTextSearchIcon"
      #search-icon
    >
      <wt-icon icon="stt-search" />
    </template>
  </wt-search-bar>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import {computed} from 'vue';
import { useI18n } from 'vue-i18n';

import WtSearchBar from '../../../../../components/wt-search-bar/wt-search-bar.vue';
import {FilterSearch} from '../index';

type ModelValue = string;
const model = defineModel<ModelValue>();

type SearchModeOptions = FilterSearch[] | Record<string, string>

const props = defineProps<{
  searchMode: string;
  searchModeOptions: SearchModeOptions;
  showTextSearchIcon?: boolean;
  name?: string;
  multisearch?: boolean
}>();

const emit = defineEmits<{
  'update:search-mode': [string];
  'handle-search': [string];
}>();

const { t } = useI18n();

const searchModeOpts = computed<FilterSearch[]>(() => {
  if (props.multisearch && props.searchModeOptions.length) {
    return props.searchModeOptions
  }

  return Object.values(props.searchModeOptions).map((mode) => {
    return {
      value: mode,
      text: t(`filters.search.${mode}`),
    };
  })
});

const currentSearchMode = computed(() =>
  searchModeOpts.value.find(({ value }) => value === props.searchMode),
);

const v$ =
  props.multisearch &&
  useVuelidate(
    computed(() => {
      return {
        model: {
          ...(currentSearchMode.value?.v || {}),
        },
      };
    }),
    { model },
    { $autoDirty: true },
  );

if (v$) v$.value.$touch();

const onSearchModeChange = (value: string) => {
  emit('update:search-mode', value);
  model.value = '';
};

const handleSearch = () => {
  emit('handle-search', model.value);
};
</script>

<style lang="scss" scoped></style>
