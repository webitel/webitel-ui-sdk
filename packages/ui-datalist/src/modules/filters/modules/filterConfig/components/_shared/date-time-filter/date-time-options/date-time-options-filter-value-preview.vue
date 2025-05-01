<template>
  <div class="date-time-options-filter-value-preview">
    <p v-if="isRelativeValue">
      {{ t(`webitelUI.filters.datetime.${props.value}`) }}
    </p>

    <template v-else>
      <div>
        <p class="date-time-options-filter-value-preview__title">
          {{ t('reusable.from') }}
        </p>

        <span>{{ from }}</span>
      </div>

      <div>
        <p class="date-time-options-filter-value-preview__title">
          {{ t('reusable.to') }}
        </p>

        <span>{{ to }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';
import { isRelativeDatetimeValue } from '@webitel/ui-sdk/scripts';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  value: { from: number; to: number } | RelativeDatetimeValue;
}>();

const { t } = useI18n();

const isRelativeValue = computed(() => {
  return isRelativeDatetimeValue(props.value);
});

const from = computed(() => {
  return isRelativeDatetimeValue.value
    ? false
    : new Date(props.value.from).toLocaleString();
});

const to = computed(() => {
  return isRelativeDatetimeValue.value
    ? false
    : new Date(props.value.to).toLocaleString();
});
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.date-time-options-filter-value-preview__title {
  @extend %typo-subtitle-1;
}
</style>
