<template>
  <div class="chat-date-divider">
    {{ formattedDate }}
  </div>
</template>

<script setup lang="ts">
import { FormatDateMode } from "@webitel/ui-sdk/enums";
import { formatDate } from "@webitel/ui-sdk/utils";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	date: number | string;
}>();

const { t } = useI18n();

const formattedDate = computed<Date>(() => {
	const chatDate = formatDate(+props.date, FormatDateMode.DATE);
	const today = formatDate(Date.now(), FormatDateMode.DATE);

	return chatDate === today ? t("reusable.today") : chatDate;
});
</script>

<style lang="scss" scoped>
  .chat-date-divider {
    @extend %typo-subtitle-1;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
