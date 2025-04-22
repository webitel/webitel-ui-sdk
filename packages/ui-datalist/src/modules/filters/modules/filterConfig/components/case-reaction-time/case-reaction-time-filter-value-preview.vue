<template>
  <div class="reaction-time-filter-value-preview">
    <div v-if="props.value.from">
      <p class="reaction-time-filter-value-preview__title">
        {{ t('reusable.from') }}
      </p>

      <span>{{ convertTimestampToDate(props.value.from) }}</span>
    </div>

    <div v-if="props.value.to">
      <p class="reaction-time-filter-value-preview__title">
        {{ t('reusable.to') }}
      </p>

      <span>{{ convertTimestampToDate(props.value.to) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  value: number[];
}>();

const { t } = useI18n();

function convertTimestampToDate(value) {
  return format(new Date(value), 'dd.MM.yyyy HH:mm');
}
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.reaction-time-filter-value-preview {
  &__title {
    @extend %typo-subtitle-1;
  }
}
</style>
