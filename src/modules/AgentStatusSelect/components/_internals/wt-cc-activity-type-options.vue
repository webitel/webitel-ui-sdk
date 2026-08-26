<template>
  <form
    class="wt-cc-activity-type-options"
    @submit.prevent
  >
    <ul class="wt-cc-activity-type-options__list">
      <li
        v-for="option of options"
        :key="option.id"
        class="wt-cc-activity-type-options__item"
      >
        <wt-radio
          :label="option.name"
          :selected="model?.id"
          :value="option.id"
          class="wt-cc-activity-type-options__radio"
          @update:selected="model = option"
        />
      </li>
    </ul>
  </form>
</template>

<script setup lang="ts">
import type { LookupOption } from '../../../../types';

withDefaults(
	defineProps<{
		options?: LookupOption[];
	}>(),
	{
		options: () => [],
	},
);

const model = defineModel<LookupOption | undefined>();
</script>

<style scoped>
.wt-cc-activity-type-options__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
}

.wt-cc-activity-type-options__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
