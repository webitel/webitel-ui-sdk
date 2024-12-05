<template>
  <wt-popup
    :shown="shown"
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
          :class="{'active': option.value === selected.value }"
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
            <wt-tooltip>
              <template #activator>
                <wt-icon-btn
                  v-if="option.description"
                  color="info"
                  icon="rounded-info"
                />
              </template>
              {{ option.description }}
            </wt-tooltip>
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
   * value determines whether the popup is displayed
   */

  shown: {
    type: Boolean,
    default: false,
  },

  /**
   * Popup titlt
   */

  title: {
    type: String,
  },

  /**
   * Should have following schema: `{ value: '', title: '', description: ''}`
   */

  selected: {
    type: Object,
  },

  /**
   * All displayed values
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
@import '../../../css/main.scss';

.wt-selection-popup {
  &__options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__item-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--spacing-xs);
    cursor: pointer;
    transition: var(--transition);
    border: 1px solid var(--text-main-color);
    border-radius: var(--border-radius);

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
