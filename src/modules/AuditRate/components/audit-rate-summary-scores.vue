<template>
  <section class="audit-rate-summary-scores">
    <div
      v-for="widget in visibleWidgets"
      :key="widget.title"
      class="audit-rate-summary-scores__item"
    >
      <wt-icon
        :icon="widget.icon"
        size="3xl"
        :color="widget.color"
      />
      <span class="typo-subtitle-1">
        {{ widget.value }}
      </span>
      <span class="typo-body-1">
        {{ widget.title }}
      </span>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
	scoreRequired?: number | null;
	scoreOptional?: number | null;
	selectYesDisplay?: string | null;
	criticalDisplay?: string | null;
}>();

const { t } = useI18n();

type ScoreWidget = {
	title: string;
	value: string;
	icon: string;
	color: string;
	display: number | string | null | undefined;
};

const scoreWidgets = computed<ScoreWidget[]>(() => [
	{
		title: t('webitelUI.auditRate.mandatory'),
		value: props.scoreRequired?.toFixed(2) ?? '',
		icon: 'star--filled',
		color: 'success',
		display: props.scoreRequired,
	},
	{
		title: t('webitelUI.auditRate.optional'),
		value: props.scoreOptional?.toFixed(2) ?? '',
		icon: 'star--filled',
		color: 'disabled',
		display: props.scoreOptional,
	},
	{
		title: t('webitelUI.auditForm.type.yes'),
		value: props.selectYesDisplay ?? '',
		icon: 'chat-message-status-sent',
		color: 'success',
		display: props.selectYesDisplay,
	},
	{
		title: t('webitelUI.auditForm.criticalViolation'),
		value: props.criticalDisplay ?? '',
		icon: 'violation--filled',
		color: 'error',
		display: props.criticalDisplay,
	},
]);

const visibleWidgets = computed(() =>
	scoreWidgets.value.filter(({ display }) => display != null),
);
</script>

<style scoped>
.audit-rate-summary-scores {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.audit-rate-summary-scores__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-main-color);
}
</style>
