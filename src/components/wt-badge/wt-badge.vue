<template>
  <span :class="{ 'wt-badge-wrapper': $slots.default }">
    <slot />
    <p-badge
      v-if="!props.hidden"
      :value="props.value"
      :class="[
        props.color && `wt-badge--color-${props.color}`,
        { 'wt-badge--overlay': $slots.default },
				`wt-badge--size-${size}`
      ]"
      class="wt-badge typo-body-1-bold"
    >
      <slot name="badge-content" />
    </p-badge>
  </span>
</template>

<script setup lang="ts">
import { BadgeColor, ComponentSize } from '../../enums';

interface Props {
	value?: string | number;
	color?: BadgeColor | null;
	size?: ComponentSize;
	hidden?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	value: '',
	color: BadgeColor.ERROR,
	size: ComponentSize.SM,
	hidden: false,
});
</script>

<style scoped>
.wt-badge-wrapper {
	width: 100%;
  position: relative;
  display: inline-flex;
}

.wt-badge--overlay {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
