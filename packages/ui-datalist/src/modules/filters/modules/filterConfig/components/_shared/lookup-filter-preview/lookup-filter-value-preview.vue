<template>
  <ul v-if="value">
    <li
      v-for="({ name, id }, index) of shownItems"
      :key="id || index"
    >
      {{ name }}
    </li>
    <li v-if="remainingCount > 0">
      {{ t('webitelUI.filters.andMore', { count: remainingCount }) }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const PREVIEW_LIMIT = 10;

const props = defineProps<{
	value: unknown;
}>();

const { t } = useI18n();

const items = computed<
	Array<{
		id?: PropertyKey;
		name?: unknown;
	}>
>(() => {
	return Array.isArray(props.value) ? props.value : [];
});

const shownItems = computed(() => items.value.slice(0, PREVIEW_LIMIT));

const remainingCount = computed(() =>
	Math.max(0, items.value.length - PREVIEW_LIMIT),
);
</script>

<style scoped></style>
