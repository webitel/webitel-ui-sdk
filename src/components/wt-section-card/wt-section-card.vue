<template>
  <section class="wt-section-card">
    <header
      v-if="$slots.title || title || icon"
      class="wt-section-card__header"
    >
      <wt-icon
        v-if="icon"
        :icon="icon"
        :color="iconColor"
        size="md"
      />
      <h3 class="wt-section-card__title typo-heading-4">
        <slot name="title">{{ title }}</slot>
      </h3>
    </header>

    <p
      v-if="$slots.description || description"
      class="wt-section-card__description typo-subtitle-2"
    >
      <slot name="description">{{ description }}</slot>
    </p>

    <div class="wt-section-card__content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconColor } from '../../enums';
import WtIcon from '../wt-icon/wt-icon.vue';

withDefaults(
	defineProps<{
		title?: string;
		description?: string;
		icon?: string;
		iconColor?: IconColor;
	}>(),
	{
		title: '',
		description: '',
		icon: '',
		iconColor: IconColor.PRIMARY,
	},
);
</script>

<style lang="scss" scoped>
@use '../../css/main' as *;

.wt-section-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-5);
}

.wt-section-card__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.wt-section-card__description {
  margin: 0;
  // успадковує стандартний колір тексту (контраст як у settings),
  // без приглушення до secondary
}

.wt-section-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
