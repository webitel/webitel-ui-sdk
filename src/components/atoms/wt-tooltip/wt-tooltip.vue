<template>
  <v-tooltip
    :class="{
      'wt-tooltip--contrast': contrast
    }"
    :placement="placement"
    :popper-class="[
      'wt-tooltip__popper',
       { 'wt-tooltip--contrast__popper': contrast },
       popperClass,
     ]"
    :triggers="triggers"
    :popper-triggers="popperTriggers"
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
    popperTriggers: {
      type: Array,
      default: () => [],
    },
    triggers: {
      type: Array,
      default: () => ['hover', 'focus', 'touch'],
    },
    popperClass: {
      type: String,
      default: '',
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
