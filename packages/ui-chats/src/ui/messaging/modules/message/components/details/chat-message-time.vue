<template>
  <aside class="chat-message-time">
    <div class="chat-message-time__sent-at">
      {{ time }}
    </div>
  </aside>
</template>


<script setup lang="ts">
import { prettifyTime } from "@webitel/ui-sdk/scripts";
import { computed, defineProps } from "vue";

const props = withDefaults(
	defineProps<{
		date?: string | number; // timestamp
	}>(),
	{
		date: "",
	},
);

const time = computed(() => prettifyTime(props.date));
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;
.chat-message-time {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  &__sent-at {
    @extend %typo-caption;
    color: var(--text-main-color);
    white-space: nowrap;
  }
}
</style>
