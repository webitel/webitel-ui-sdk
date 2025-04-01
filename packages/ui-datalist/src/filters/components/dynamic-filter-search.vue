<template>
  <wt-search-bar
    :placeholder="t('reusable.search')"
    :search-mode="props.searchMode"
    :search-mode-options="searchModeOptions"
    :value="model"
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
import { WtSearchBar } from '@webitel/ui-sdk/src/components/index';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

type ModelValue = string;
const model = defineModel<ModelValue>();

const props = defineProps<{
  searchMode: string;
  searchModeOptions: Record<string, string>;
  showTextSearchIcon?: boolean;
}>();

const emit = defineEmits<{
  'update:search-mode': [string];
  'handle-search': [string];
}>();

const { t } = useI18n();

const onSearchModeChange = (value: string) => {
  emit('update:search-mode', value);
  model.value = '';
};

const handleSearch = () => {
  emit('handle-search', model.value);
};

const searchModeOptions = computed(() =>
  Object.values(props.searchModeOptions).map((mode) => {
    return {
      value: mode,
      text: t(`filters.search.${mode}`),
    };
  }),
);
</script>

<style lang="scss" scoped></style>
