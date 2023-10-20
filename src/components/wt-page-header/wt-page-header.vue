<template>
  <wt-headline>
    <template v-slot:title-wrapper>
      <slot>
      </slot>
    </template>
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <template v-slot:actions>
      <slot name="actions"></slot>
      <slot
        name="primary-action"
        v-if="!hidePrimary"
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
        color="secondary"
        :disabled="secondaryDisabled"
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
  hidePrimary: {
    type: Boolean,
    default: false,
  },
  hideSecondary: {
    type: Boolean,
    default: false,
  },
  primaryText: {
    type: String,
  },
  primaryAction: {
    type: Function,
  },
  primaryDisabled: {
    type: Boolean,
    default: false,
  },
  secondaryDisabled: {
    type: Boolean,
    default: false,
  },
  secondaryText: {
    type: String,
  },
  secondaryAction: {
    type: Function,
  },
});

const emptySecondary = computed(() => !(props.secondaryAction || props.secondaryText));
</script>

<style lang="scss" scoped>

.wt-headline {
  .wt-button {
    margin-left: var(--spacing-sm);

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
