<template>
      <media-toggle-button
        ref="toggleButton"
        class="toggle-button"
        @click="setToggleState"
      >
        <wt-icon-btn
          :icon="props.firstIcon"
          :color="props.color"
          class="toggle-button__first"
        />
        <wt-icon-btn
          :icon="props.secondIcon"
          :color="props.color"
          class="toggle-button__second"
        />
      </media-toggle-button>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, Ref, useTemplateRef} from 'vue';

import WtIconBtn from "../../wt-icon-btn/wt-icon-btn.vue";

const props = defineProps<{
  firstIcon: string;
  secondIcon: string;
  color?: string;
}>();

const toggleButton = useTemplateRef('toggleButton') as Ref<HTMLElement>;

const emit = defineEmits<{
  (e: 'click', value: boolean): void;
}>();

const setToggleState = () => {
  emit('click', toggleButton.value.pressed);
}

</script>

<style lang="scss" scoped>

.toggle-button[data-pressed] .toggle-button__first,
.toggle-button:not([data-pressed]) .toggle-button__second {
  display: none;

}
</style>
