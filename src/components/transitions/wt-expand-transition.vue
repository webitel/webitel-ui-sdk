<script>
/* eslint-disable no-param-reassign */
// https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
export default {
  name: 'wt-expand-transition',
  functional: true,
  render(createElement, context) {
    const data = {
      props: {
        name: 'expand',
      },
      on: {
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
          // eslint-disable-next-line no-unused-expressions
          getComputedStyle(element).height;

          // eslint-disable-next-line no-return-assign
          requestAnimationFrame(() => element.style.height = height);
        },
        leave(element) {
          const { height } = getComputedStyle(element);
          element.style.height = height;
          // eslint-disable-next-line no-unused-expressions
          getComputedStyle(element).height;

          // eslint-disable-next-line no-return-assign
          requestAnimationFrame(() => element.style.height = 0);
        },
      },
    };
    return createElement('transition', data, context.children);
  },
};
</script>

<style lang="scss">
.expand-enter-active,
.expand-leave-active {
  transition: height var(--transition);
  overflow: hidden;
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
