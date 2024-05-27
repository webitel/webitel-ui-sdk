<template>
  <div class="wt-stepper">
    <div class="wt-stepper-header">
      <div
        class="wt-stepper-steps"
      >
        <div
          v-for="({name, completed}, idx) in stepWithCompleted"
          class="wt-stepper-steps__wrapper"
        >
          <div
            v-if="idx !== 0"
            :class="{ 'wt-stepper-steps__divider--completed': completed }"
            class="wt-stepper-steps__divider"
          />
          <wt-chip
            :color="completed ? 'primary' : 'secondary'"
            class="wt-stepper-steps__item"
          >
            {{ name }}
          </wt-chip>
        </div>
      </div>
    </div>

    <slot name="description">
      <p class="wt-stepper-description">
        {{ description }}
      </p>
    </slot>

    <slot name="main" />
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  steps: {
    type: Object,
  },
  activeStep: {
    type: Number,
    default: 1,
  },
});

const description = computed(() => props.steps[props.activeStep - 1].description);

const stepWithCompleted = computed(() => props.steps.map((item, idx) => ({
  ...item,
  completed: props.activeStep > idx,
})));
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-stepper {
  width: 100%;
}

.wt-stepper-header {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-lg);
}

.wt-stepper-steps {
  display: flex;
  align-items: center;

  &__wrapper {
    display: contents;
  }

  &__divider {
    flex: 1 1 auto;
    height: 1px;
    background: var(--wt-stepper-divider-background-color);

    &--completed {
      background-color: var(--wt-stepper-divider-background-completed-color);
    }
  }
}

.wt-stepper-description {
  margin-bottom: var(--spacing-lg);
  text-align: center;
}
</style>
