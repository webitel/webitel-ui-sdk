<template>
  <section class="spacing">
    <h2>Spacing</h2>
    <p>There are some variables for default elements spacing cases:</p>
    <ul>
      <li>
        <code class="language-css">var(--component-padding); = {{ variables.componentPadding }}</code>
        <p>This variable is used for wrapper component paddings. For instance:</p>
        <img
          width="500"
          src="../../../../assets/docs/styles/spacing/component-padding.png"
          alt="component padding pic"
        >
      </li>
      <li>
        <code class="language-css">var(--component-spacing); = {{ variables.componentSpacing }}</code>
        <p>Component spacing is used for components gaps: margins, grid-gap, etc. For instance:</p>
        <img
          width="500"
          src="../../../../assets/docs/styles/spacing/component-spacing.png"
          alt="component spacing pic"
        >
      </li>
      <li>
        <code class="language-css">var(--icon-spacing); = {{ variables.iconSpacing }}</code>
        <p>This one is very simple: this variable is always used for any icon-related margins. Typical case is:</p>
        <pre><code class="language-css">.wt-icon { margin-right: var(--icon-spacing);</code></pre>
        <img
          width="400"
          src="../../../../assets/docs/styles/spacing/icon-spacing.png"
          alt="component spacing pic"
        >
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'spacing',
  computed: {
    variables() {
      return {
        componentPadding: getComputedStyle(document.documentElement).getPropertyValue('--component-padding'),
        componentSpacing: getComputedStyle(document.documentElement).getPropertyValue('--component-spacing'),
        iconSpacing: getComputedStyle(document.documentElement).getPropertyValue('--icon-spacing'),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
