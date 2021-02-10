<template>
  <section class="display-helpers">
    <h2>Display Helpers</h2>
    <p>
      The display helper css classes allow you to control the display of content. This includes being
      conditionally visible based upon the current viewport, or the actual element display type.
    </p>
    <p>Specify the elements display property. These classes can be applied to all breakpoints from xs to xl.
      Base class,<code class="language-css">.d-{value},</code> doesn't depend on viewport size

      <code class="language-css">.d-{value}</code>
        <code class="language-css">.d-{breakpoint}-{value}</code> for sm, md, lg and xl
      The value property is one of:
    </p>
    <ul>
      <li><code class="language-html">none</code></li>
      <li><code class="language-html">inline-block</code></li>
      <li><code class="language-html">block</code></li>
      <li><code class="language-html">flex</code></li>
    </ul>
    <p>
      <strong>When setting a specific breakpoint for a display helper class, it will apply to all screen widths from the
        designation and down.</strong>
      For example, d-md-flex will apply to md, sm and xs size screens.</p>
    <h3>[Currently] Available classes:</h3>
    <h4>Base classes</h4>
    <ul>
      <li><code class="language-css">d-none</code></li>
    </ul>
    <h4>Small viewport classes</h4>
    <ul>
      <li><code class="language-css">d-none-sm</code></li>
      <li><code class="language-css">d-block-sm</code></li>
    </ul>
    <h4>Extra small viewport classes</h4>
    <ul>
      <li><code class="language-css">d-none-xs</code></li>
      <li><code class="language-css">d-block-xs</code></li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'display-helpers',
};
</script>

<style scoped>

</style>
