<template>
  <wt-headline>
    <template v-slot:title-wrapper>
      <slot>
        <template slot="title">
          <slot name="title"></slot>
        </template>
      </slot>
    </template>
    <template v-slot:actions>
      <slot name="actions"></slot>
      <slot name="primary-action">
        <wt-button
          v-if="!hidePrimary"
          :disabled="primaryDisabled"
          @click="primaryAction"
        >
          {{ primaryText || t('reusable.add') }}
        </wt-button>
      </slot>
      <wt-button
        v-if="!hideSecondary"
        color="secondary"
        @click="secondaryAction"
      >
        {{ t('reusable.delete') }}
      </wt-button>
    </template>
  </wt-headline>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

const props = defineProps({
  hidePrimary: {
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
  secondaryText: {
    type: String,
  },
  secondaryAction: {
    type: Function,
  },
});

const hideSecondary = computed(() => !(props.secondaryAction || props.secondaryText));
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
