<template>
  <wt-search-bar
    :placeholder="t('reusable.search')"
    :search-mode="props.searchMode"
    :search-mode-options="searchModeOptions"
    :value="model"
    :v="v$.model"
    @input="model = $event"
    @search="handleSearch"
    @update:search-mode="emit('update:search-mode', $event.value)"
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
import { required } from '@vuelidate/validators';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import WtSearchBar from '../../../../../components/wt-search-bar/wt-search-bar.vue';

type ModelValue = string;
const model = defineModel<ModelValue>();

const props = defineProps<{
  searchMode: string;
  searchModeOptions: Record<string, string>;
  showTextSearchIcon: boolean;
}>();

const emit = defineEmits<{
  'update:search-mode': [string];
  'handle-search': [string];
}>();

const { t } = useI18n();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required,
    },
  })),
  { model },
  { $autoDirty: true },
);

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
