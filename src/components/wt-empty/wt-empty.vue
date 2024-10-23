<template>
  <section
    :class="[`wt-empty--${size}`]"
    class="wt-empty"
  >
    <div
      v-if="image || slots.media"
      class="wt-empty__media"
    >
      <slot name="media">
        <wt-image
          :src="image"
          alt="empty-state"
        />
      </slot>
    </div>

    <h2
      v-if="headline || slots.headline"
      class="wt-empty__headline"
    >
      <slot name="headline">
        {{ headline }}
      </slot>
    </h2>

    <h3
      v-if="title || slots.title"
      class="wt-empty__title"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </h3>

    <slot></slot>

    <p
      v-if="text || slots.text"
      class="wt-empty__text"
    >
      <slot name="text">
        {{ text }}
      </slot>
    </p>

    <div
      v-if="actionText || slots.actions"
      class="wt-empty__actions"
    >
      <slot
        name="actions"
        v-bind="{ onClick }"
      >
        <wt-button
          :color="actionColor"
          @click="onClick"
        >
          {{ actionText }}
        </wt-button>
      </slot>
    </div>
  </section>
</template>

<script setup>
// based on https://vuetifyjs.com/en/components/empty-states/

import { useSlots } from 'vue';
import WtImage from '../wt-image/wt-image.vue';

const props = defineProps({
  image: {
    type: [Object, null],
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v),
  },
  headline: {
    type: [String, null],
    default: '',
  },
  title: {
    type: [String, null],
    default: '',
  },
  text: {
    type: [String, null],
    default: '',
  },
  actionText: {
    type: [String, null],
    default: '',
  },
  actionColor: {
    type: [String, null],
    default: 'primary',
  },
});

const emit = defineEmits([
  'click:action',
]);

const slots = useSlots();

const onClick = (params) => {
  return emit('click:action', params);
};
</script>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';

.wt-empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: var(--spacing-sm);

  &__media {
  }

  &__headline {
  }

  &__title {
  }

  &__text {
  }

  &__actions {
  }
}
</style>
