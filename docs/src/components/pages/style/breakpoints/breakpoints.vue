<template>
  <section class="breakpoints">
    <h2>Breakpoints</h2>
    <p>According to
      <a class="full-docs-link" href="https://material.io/design/layout/responsive-layout-grid.html#breakpoints">
        Material Design docs
      </a> (or
      <a class="full-docs-link" href="https://vuetifyjs.com/en/styles/spacing/#breakpoints">Vuetify</a>
      simplified docs)
    </p>
    <p>
      App has <b>4</b> main breakpoints:
    </p>
    <ul>
      <li><code class="language-css">sm</code>: 600px (phones -> tablets)</li>
      <li><code class="language-css">md</code>: 992px (tablets)</li>
      <li><code class="language-css">lg</code>: 1280px (tablets -> laptops)</li>
      <li><code class="language-css">xl</code>: 1440px (laptops -> desktop)</li>
    </ul>
    <p>
      and <b>5</b> <code class="language-css">@media</code> queries:
    </p>
    <code class="language-css">$media: only screen</code>
    <ul>
      <li>
        <code class="language-css">$media-width-xl (ex. usage: @media #{$media} and #{$media-width-xl})</code>
        : 1440px and above
      </li>
      <li>
        <code class="language-css">$media-width-lg (ex. usage: @media #{$media} and #{$media-width-lg})</code>
        : 1440px and below
      </li>
      <li>
        <code class="language-css">$media-width-md (ex. usage: @media #{$media} and #{$media-width-md})</code>
        : 1280px and below
      </li>
      <li>
        <code class="language-css">$media-width-sm (ex. usage: @media #{$media} and #{$media-width-sm})</code>
        : 992px and below
      </li>
      <li>
        <code class="language-css">$media-width-xs (ex. usage: @media #{$media} and #{$media-width-xs})</code>
        : 600px and below
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'breakpoints',
};
</script>

<style scoped>

</style>
