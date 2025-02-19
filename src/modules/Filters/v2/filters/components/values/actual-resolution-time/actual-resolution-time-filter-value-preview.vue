<template>
  <div class="actual-resolution-time-filter-value-preview">
    <div v-if="props.value.from">
      <p class="actual-resolution-time-filter-value-preview__title">
        {{t('reusable.from')}}
      </p>

      <span>{{convertTimestampToDate(props.value.from)}}</span>
    </div>

    <div v-if="props.value.to">
      <p class="actual-resolution-time-filter-value-preview__title">
        {{t('reusable.to')}}
      </p>

      <span>{{convertTimestampToDate(props.value.to)}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const props = defineProps<{
  value: number[];
}>();

const { t } = useI18n();

function convertTimestampToDate(value) {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
</script>

<style lang="scss" scoped>
.actual-resolution-time-filter-value-preview {
  &__title {
    @extend %typo-subtitle-1;
  }
}
</style>
