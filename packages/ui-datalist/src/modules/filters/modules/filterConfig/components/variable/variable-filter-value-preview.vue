<template>
  <div class="variables-filter-value-preview">
    <div>
      <p class="variables-filter-value-preview__title">
        {{ t('vocabulary.keys') }}:
      </p>
      <span>{{ variable[0] }}</span>
    </div>

    <div>
      <p class="variables-filter-value-preview__title">
        {{ t('vocabulary.values') }}:
      </p>
      <span>{{ variable[1] }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  value: string;
}>();

const { t } = useI18n();

const variable = props.value.split('=');
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.variables-filter-value-preview {
  &__title {
    @extend %typo-subtitle-1;
  }
}
</style>
