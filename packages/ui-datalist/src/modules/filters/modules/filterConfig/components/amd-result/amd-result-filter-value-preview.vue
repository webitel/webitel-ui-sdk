<template>
  <ul>
    <li
      v-for="(result, index) of shownValues"
      :key="index"
    >
      {{ result }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const AMD_RESULT_EMPTY_VALUE = 'EMPTY';

const props = defineProps<{
	value: string[];
}>();

const { t } = useI18n();

const shownValues = computed(() =>
	props.value.map((result) =>
		result === AMD_RESULT_EMPTY_VALUE ? t('reusable.empty') : result,
	),
);
</script>

<style scoped></style>
