<template>
  <div class="score-from-to-filter-value-preview">
    <div v-if="props.value.from">
      <p class="score-from-to-filter-value-preview__title">
        {{t('reusable.from')}}
      </p>

      <span>{{props.value.from}}</span>
    </div>

    <div v-if="props.value.to">
      <p class="score-from-to-filter-value-preview__title">
        {{t('reusable.to')}}
      </p>

      <span>{{props.value.to}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  value: number[];
}>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.score-from-to-filter-value-preview {
  &__title {
    @extend %typo-subtitle-1;
  }
}
</style>
