<template>
  <v-tooltip
    :class="{
      'wt-tooltip--contrast': contrast
    }"
    :placement="placement"
    :popper-class="[
      'wt-tooltip__popper',
       { 'wt-tooltip--contrast__popper': contrast },
     ]"
    :triggers="['hover', 'focus', 'touch']"
    class="wt-tooltip"
  >
    <slot name="activator"></slot>
    <template #popper>
      <slot></slot>
    </template>
  </v-tooltip>
</template>

<script>
export default {
  name: 'wt-tooltip',
  props: {
    contrast: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'auto',
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-tooltip {
  display: inline-block;
  line-height: 0;
  height: fit-content;
}
</style>
