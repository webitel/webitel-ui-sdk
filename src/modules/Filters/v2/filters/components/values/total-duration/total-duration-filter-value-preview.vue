<template>
  <div class="total-duration-filter-value-preview">
    <div v-if="props.value.from">
      <p class="total-duration-filter-value-preview__title">
        {{t('reusable.from')}}
      </p>

      <span>{{formatTime(props.value.from)}}</span>
    </div>

    <div v-if="props.value.to">
      <p class="total-duration-filter-value-preview__title">
        {{t('reusable.to')}}
      </p>

      <span>{{formatTime(props.value.to)}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const props = defineProps<{
  value: number[];
}>();

const { t } = useI18n();

const formatTime = (value) => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return `${t('webitelUI.timepicker.min')} ${minutes} ${t('webitelUI.timepicker.sec')} ${seconds}`;
}
</script>

<style lang="scss" scoped>
.duration-filter-value-preview {
  &__title {
    @extend %typo-subtitle-1;
  }
}
</style>
