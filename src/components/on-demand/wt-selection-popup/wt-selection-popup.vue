<template>
  <wt-popup
    class="wt-selection-popup"
    overflow
    size="sm"
    v-bind="$attrs"
    @close="close"
  >
    <template #title>
      {{ title }}
    </template>
    <template #main>
      <ul class="wt-selection-popup__options">
        <li
          v-for="(option, key) of options"
          :key="key"
          :class="{ active: option.value === selected.value }"
          class="wt-selection-popup__item-wrapper"
          @click="selectOption(option)"
        >
          <slot
            :option="option"
            name="option"
          >
            <wt-icon
              v-if="option.icon"
              :icon="option.icon"
              size="sm"
            />
            <h4 class="wt-selection-popup__item-header">
              {{ option.title }}
            </h4>
            <p
              v-if="option.description"
              class="popup-options__item-text"
            >
              {{ option.description }}
            </p>

            <wt-icon-btn
              v-if="option.description"
              v-tooltip="option.description"
              color="info"
              icon="rounded-info"
            />
          </slot>
        </li>
      </ul>
      <!--Slot for displaying specific template styling-->
      <slot name="after-section" />
    </template>

    <template #actions>
      <wt-button
        :disabled="!selected"
        @click="add"
      >
        {{ t('reusable.create') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const props = defineProps({
  /**
   * Popup title
   */

  title: {
    type: String,
  },

  /**
   * Selected value. The scheme repeats attribute `option` from `options`
   */

  selected: {
    type: Object,
  },

  /**
   * All displayed values. Should have following schema: `{ value: '', title: '', description: '', icon: ''}`
   */

  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['change', 'add', 'close']);

const { t } = useI18n();

function add() {
  emit('add', props.selected);
}

function close() {
  emit('close');
}

function selectOption(option) {
  emit('change', option);
}
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-selection-popup {
  &__options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__item-wrapper {
    display: flex;
    position: relative;
    align-items: center;
    transition: var(--transition);
    cursor: pointer;
    border: 1px solid var(--text-main-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-xs);

    &:hover,
    &.active {
      border: 1px solid var(--primary-color);
    }

    .wt-icon {
      margin-right: var(--spacing-xs);
    }

    .wt-tooltip {
      margin-left: auto;
    }
  }

  &__item-header {
    @extend %typo-subtitle-2;
  }
}
</style>
