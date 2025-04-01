<template>
  <div>
    <p v-if="props.value.unassigned">{{ t('reusable.unassigned') }}</p>
    <ul v-if="localValue">
      <li
        v-for="({ name }, index) of localValue"
        :key="index"
      >
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { searchMethod } from './config.js';

const props = defineProps<{
  value: number[];
}>();

const localValue = ref([]);
const { t } = useI18n();

const getLocalValue = async () => {
  const { items } = await searchMethod({ id: props.value.list });
  localValue.value = items;
};

getLocalValue();
</script>

<style lang="scss" scoped></style>
