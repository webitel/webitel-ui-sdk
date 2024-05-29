<template>
  <transition
    name="expand"
    @enter="enter"
    @leave="leave"
    @after-enter="afterEnter"
  >
    <slot />
  </transition>
</template>

<script>

// https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
export default {
  name: 'WtExpandTransition',
  methods: {
    afterEnter(element) {
      element.style.height = 'auto';
    },
    enter(element) {
      const { width } = getComputedStyle(element);
      element.style.width = width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';

      const { height } = getComputedStyle(element);
      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      // Force repaint to make sure the
      // animation is triggered correctly.

      getComputedStyle(element).height;

      requestAnimationFrame(() => element.style.height = height);
    },
    leave(element) {
      const { height } = getComputedStyle(element);
      element.style.height = height;

      getComputedStyle(element).height;

      requestAnimationFrame(() => element.style.height = 0);
    },
  },
};
</script>

<style lang="scss">
.expand-enter-active,
.expand-leave-active {
  overflow: hidden;
  transition: height var(--transition);
}

.expand-enter,
.expand-leave-to {
  height: 0;
}

/*
  // expand animation optimization
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
 */
</style>
