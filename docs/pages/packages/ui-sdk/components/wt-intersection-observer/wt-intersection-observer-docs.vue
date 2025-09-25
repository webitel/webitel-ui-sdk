<template>
  <section>
    <component-model />
    <component-props :properties="properties" />
    <component-events :events="events" />
    <component-slots :slots="slots" />
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtIntersectionObserverDocs',
  data: () => ({
    properties: [
      {
        value: 'canLoadMore',
        code: '<wt-intersection-observer :can-load-more="true"></wt-intersection-observer>',
        type: 'Boolean',
        default: 'true',
        description: 'Controls whether the observer should trigger the next event. Set to false when no more data is available to prevent unnecessary API calls.',
      },
      {
        value: 'loading',
        code: '<wt-intersection-observer :loading="isLoading"></wt-intersection-observer>',
        type: 'Boolean',
        default: 'false',
        description: 'Shows a loading indicator when true. Useful for indicating that data is being fetched.',
      },
      {
        value: 'root',
        code: '<wt-intersection-observer :root="scrollContainer"></wt-intersection-observer>',
        type: 'Element | null',
        default: 'null',
        description: 'The scrollable container element. When null, uses the viewport as the root. Required when observing inside a scrollable container.',
      },
    ],
    events: [
      {
        value: 'next',
        params: [],
        description: 'Emitted when the observer element comes into view and canLoadMore is true. Use this event to trigger loading more data.',
      },
    ],
    slots: [],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>
