<template>
  <wt-headline>
    <template #title-wrapper>
      <slot />
    </template>
    <template #title>
      <slot name="title" />
    </template>
    <template #actions>
      <slot name="actions" />
      <slot
        v-if="!hidePrimary"
        name="primary-action"
      >
        <wt-button
          :disabled="primaryDisabled"
          @click="primaryAction"
        >
          {{ primaryText || $t('reusable.add') }}
        </wt-button>
      </slot>
      <wt-button
        v-if="!hideSecondary && !emptySecondary"
        :disabled="secondaryDisabled"
        color="secondary"
        @click="secondaryAction"
      >
        {{ secondaryText || $t('reusable.close') }}
      </wt-button>
    </template>
  </wt-headline>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	/**
	 * Hides primary button
	 * @type {boolean}
	 * @default false
	 */
	hidePrimary: {
		type: Boolean,
		default: false,
	},
	/**
	 * Hides secondary button
	 * @type {boolean}
	 * @default false
	 */
	hideSecondary: {
		type: Boolean,
		default: false,
	},
	/**
	 * Text for primary button. If empty - the title "ADD"
	 * @type {string}
	 */
	primaryText: {
		type: String,
	},
	/**
	 * Primary button click handler
	 * @type {Function}
	 */
	primaryAction: {
		type: Function,
	},
	/**
	 * Disables primary button
	 * @type {boolean}
	 * @default false
	 */
	primaryDisabled: {
		type: Boolean,
		default: false,
	},
	/**
	 * Disables secondary button
	 * @type {boolean}
	 * @default false
	 */
	secondaryDisabled: {
		type: Boolean,
		default: false,
	},
	/**
	 * Text for secondary button. If empty - the title "CLOSE"
	 * @type {string}
	 */
	secondaryText: {
		type: String,
	},
	/**
	 * Secondary button click handler
	 * @type {Function}
	 */
	secondaryAction: {
		type: Function,
	},
});

const emptySecondary = computed(
	() => !(props.secondaryAction || props.secondaryText),
);
</script>

<style scoped>
.wt-headline {
  margin-left: var(--spacing-sm);
}

.wt-headline .wt-button {
  margin-left: var(--spacing-sm);
}

.wt-headline .wt-button:first-child {
  margin-left: 0;
}
</style>
