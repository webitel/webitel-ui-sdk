<template>
  <div class="talk-duration-filter-value-preview">
    <div v-if="from">
      <p class="talk-duration-filter-value-preview__title">
        {{ t('reusable.from') }}
      </p>

      <span>{{ from }}</span>
    </div>

    <div v-if="to">
      <p class="talk-duration-filter-value-preview__title">
        {{ t('reusable.to') }}
      </p>

      <span>{{ to }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { useFromToSecToPreviewTime } from '../../composables/useFromToSecToPreviewTime';
import type { TalkDurationFilterModelValue } from './TalkDurationFilter.d.ts';

const props = defineProps<{
  value: TalkDurationFilterModelValue;
}>();

const { t } = useI18n();

const { from, to } = useFromToSecToPreviewTime(props.value);
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.duration-filter-value-preview {
  &__title {
    @extend %typo-subtitle-1;
  }
}
</style>
