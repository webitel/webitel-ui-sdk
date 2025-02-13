<template>
  <wt-dual-panel @update:size="size">
    <template #header>
      <wt-page-header hide-primary>
        <template #actions>
          <wt-button color="secondary">
            {{ t('reusable.edit') }}
          </wt-button>
        </template>
      </wt-page-header>
    </template>
    <template #side></template>
    <template #main></template>
  </wt-dual-panel>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ComponentSize } from '../../../../../../src/enums/index.ts';

const { t } = useI18n();
const size = ref(ComponentSize.MD);
</script>
