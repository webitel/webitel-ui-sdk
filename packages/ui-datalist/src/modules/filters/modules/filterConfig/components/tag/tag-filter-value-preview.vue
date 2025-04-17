<template>
  <ul>
    <li
      v-for="(tag, index) of tags"
      :key="index"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { CallHistoryTagFilterOptions } from '../../enums/options/CallHistoryTagFilterOptions';

const props = defineProps<{
  value: string[];
}>();

const { t } = useI18n();

const tags = computed(() => {
  const tagLocaleMap = CallHistoryTagFilterOptions.reduce((acc, option) => {
    return {
      ...acc,
      [option.value]: option.locale,
    };
  }, {});

  return props.value.map((tag) => {
    return t(tagLocaleMap[tag]) || tag;
  });
});
</script>

<style scoped></style>
