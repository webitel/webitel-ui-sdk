<template>
  <div class="date-time-options-filter-value-preview">
    <p v-if="isRelativeValue">
      {{ t(`webitelUI.filters.datetime.${props.value}`) }}
    </p>

    <template v-else>
      <div>
        <p class="date-time-options-filter-value-preview__title typo-subtitle-1">
          {{ t('reusable.from') }}
        </p>

        <span>{{ from }}</span>
      </div>

      <div>
        <p class="date-time-options-filter-value-preview__title typo-subtitle-1">
          {{ t('reusable.to') }}
        </p>

        <span>{{ to }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { FormatDateMode, RelativeDatetimeValue } from '@webitel/ui-sdk/enums';
import { isEmpty, isRelativeDatetimeValue } from '@webitel/ui-sdk/scripts';
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
	value:
		| {
				from: number;
				to: number;
		  }
		| RelativeDatetimeValue;
}>();

const { t } = useI18n();

const isRelativeValue = computed(() => {
	return isRelativeDatetimeValue(props.value);
});

const absoluteValue = computed(() => {
	return !isEmpty(props.value) && typeof props.value === 'object'
		? props.value
		: null;
});

const from = computed(() => {
	return absoluteValue.value
		? formatDate(absoluteValue.value.from, FormatDateMode.DATETIME)
		: false;
});

const to = computed(() => {
	return absoluteValue.value
		? formatDate(absoluteValue.value.to, FormatDateMode.DATETIME)
		: false;
});
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

</style>
