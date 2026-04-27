<template>
  <div
    class="toggle-button"
    @click="setToggleState"
  >
    <wt-icon-btn
      :icon="props.icon"
      :color="props.color"
      :disabled="props.disabled"
    />
  </div>
</template>

<script setup lang="ts">
import WtIconBtn from '../../wt-icon-btn/wt-icon-btn.vue';

const props = defineProps<{
	icon: string;
	color?: string;
	disabled?: boolean;
}>();

const emit = defineEmits<{
	toggle: [];
}>();

const setToggleState = () => {
	if (props.disabled) return;
	emit('toggle');
};
</script>
