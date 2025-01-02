<template>
  <section
    :class="[`wt-empty--size-${size}`]"
    class="wt-empty"
  >
    <div
      v-if="showMedia"
      class="wt-empty__media"
    >
      <!--         @slot for custom media, replaces image
                  @scope `{ size: mediaSize }`
       -->
      <slot
        name="media"
        v-bind="{ size: mediaSize }"
      >
        <wt-image
          :size="mediaSize"
          :src="image"
          alt="empty-state"
        />
      </slot>
    </div>

    <div
      v-if="showHeadline || showTitle || showText"
      class="wt-empty__info"
    >
      <h2
        v-if="showHeadline"
        class="wt-empty__headline"
      >
        <!--         @slot for custom headline, replaces headline
                  @scope `{ headline }`
       -->
        <slot
          name="headline"
          v-bind="{ headline }"
        >
          {{ headline }}
        </slot>
      </h2>

      <h3
        v-if="showTitle"
        class="wt-empty__title"
      >
        <!--         @slot for custom title, replaces title
                  @scope `{ title }`
       -->
        <slot
          name="title"
          v-bind="{ title }"
        >
          {{ title }}
        </slot>
      </h3>

      <p
        v-if="showText"
        class="wt-empty__text"
      >
        <!--         @slot for custom text, replaces text
                  @scope `{ text }`
       -->
        <slot
          name="text"
          v-bind="{ text }"
        >
          {{ text }}
        </slot>
      </p>
    </div>

    <!--         @slot custom content, between text and actions
                @scope `{ size }`
     -->
    <slot v-bind="{ size }"></slot>

    <div
      v-if="showActions"
      class="wt-empty__actions"
    >
      <!--         @slot for custom actions, replaces primary and secondary actions
                  @scope `{ onPrimaryClick, onSecondaryClick }`
       -->
      <slot
        name="actions"
        v-bind="{ onPrimaryClick, onSecondaryClick }"
      >
        <!--         @slot for custom primary action, replaces primaryAction
                    @scope `{ onPrimaryClick }`
         -->
        <slot
          name="primary-action"
          v-bind="{ onPrimaryClick }"
        >
          <wt-button
            v-if="primaryActionText"
            :size="buttonSize"
            color="primary"
            @click="() => onPrimaryClick()"
          >
            {{ primaryActionText }}
          </wt-button>
        </slot>

        <!--         @slot for custom secondary action, replaces secondaryAction
                    @scope `{ onSecondaryClick }`
         -->
        <slot
          name="secondary-action"
          v-bind="{ onSecondaryClick }"
        >
          <wt-button
            v-if="secondaryActionText"
            :size="buttonSize"
            color="secondary"
            @click="() => onSecondaryClick()"
          >
            {{ secondaryActionText }}
          </wt-button>
        </slot>
      </slot>
    </div>
  </section>
</template>

<script setup>
// based on https://vuetifyjs.com/en/components/empty-states/

import { computed, useSlots } from 'vue';

import ComponentSize from '../../enums/ComponentSize/ComponentSize.enum.js';
import { greaterOrEqual, smallerOrEqual } from '../../scripts/compareSize.ts';
import WtImage from '../wt-image/wt-image.vue';

const props = defineProps({
  image: {
    type: [Object, null],
  },
  /**
   * @values 'sm', 'md', 'lg'
   */
  size: {
    type: String,
    default: ComponentSize.MD,
    validator: (v) =>
      [ComponentSize.SM, ComponentSize.MD, ComponentSize.LG].includes(v),
  },
  /**
   * shown only if prop or slot is provided
   */
  headline: {
    type: [String, null],
    default: '',
  },
  /**
   * shown only if prop or slot is provided
   */
  title: {
    type: [String, null],
    default: '',
  },
  /**
   * shown only if prop or slot is provided
   */
  text: {
    type: [String, null],
    default: '',
  },
  /**
   * primary action is shown only if prop or slot is provided
   */
  primaryActionText: {
    type: [String, null],
    default: '',
  },
  /**
   * secondary action shown only if prop or slot is provided
   */
  secondaryActionText: {
    type: [String, null],
    default: '',
  },
});

const emit = defineEmits([
  /**
   * emitted without a parameter, but could accept one, if used in a slot
   */
  'click:primary',

  /**
   * emitted without a parameter, but could accept one, if used in a slot
   */
  'click:secondary',
]);

const slots = useSlots();

const showMedia = computed(() => props.image || slots.media);

const showHeadline = computed(() => props.headline || slots.headline);

const showTitle = computed(() => props.title || slots.title);

const showText = computed(() => props.text || slots.text);

const showActions = computed(() => {
  return [
    props.primaryActionText,
    props.secondaryActionText,
    slots.actions,
    slots['primary-action'],
    slots['secondary-action'],
  ].some((v) => v);
});

const mediaSize = computed(() => {
  if (smallerOrEqual(props.size, ComponentSize.SM)) {
    return ComponentSize.XXS;
  }

  if (greaterOrEqual(props.size, ComponentSize.LG)) {
    return ComponentSize.MD;
  }

  return ComponentSize.SM;
});

const buttonSize = computed(() => {
  if (smallerOrEqual(props.size, ComponentSize.SM)) {
    return ComponentSize.SM;
  }

  return ComponentSize.MD;
});

const onClick = (action) => (params) => {
  emit(`click:${action}`, params);
};

const onPrimaryClick = onClick('primary');

const onSecondaryClick = onClick('secondary');
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../css/main.scss';

.wt-empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  width: var(--wt-empty-width);
  min-width: var(--wt-empty-min-width);
  max-width: var(--wt-empty-max-width);
  margin: auto;
  padding: var(--spacing-md);
  text-align: center;
  gap: var(--spacing-md);

  &__info {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  &__headline,
  &__title,
  &__text {
    text-align: center;
  }

  &__headline {
    @extend %typo-heading-4;
  }

  &__title {
    @extend %typo-subtitle-1;
  }

  &__text {
    @extend %typo-body-1;
  }

  &__actions {
    display: flex;
    gap: var(--spacing-sm);
  }

  &--size {
    &-sm.wt-empty {
      padding: var(--spacing-sm);
      gap: var(--spacing-sm);

      &__headline {
        @extend %typo-heading-4;
      }

      &__title {
        @extend %typo-subtitle-2;
      }

      &__text {
        @extend %typo-body-2;
      }
    }

    &-md.wt-empty {
      padding: var(--spacing-md);
      gap: var(--spacing-md);

      &__headline {
        @extend %typo-heading-4;
      }

      &__title {
        @extend %typo-subtitle-1;
      }

      &__text {
        @extend %typo-body-1;
      }
    }

    &-lg.wt-empty {
      padding: var(--spacing-lg);
      gap: var(--spacing-lg);

      &__headline {
        @extend %typo-heading-4;
      }

      &__title {
        @extend %typo-subtitle-1;
      }

      &__text {
        @extend %typo-body-1;
      }
    }
  }
}
</style>
