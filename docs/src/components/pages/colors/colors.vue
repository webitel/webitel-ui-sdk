<template>
  <section class="colors">
    <h2>Colors</h2>
    <article class="colors__family">
      <h3 class="colors__family-heading">Main Colors</h3>
      <div class="colors__family-wrapper">
        <div class="color-item">
          <div class="color-item__text">Main primary color</div>
          <code>
            .item {
              background: var(--main-primary-color);
            }
          </code>
          <div class="color-item__usage--main-primary">Usage</div>
        </div>

        <div class="color-item">
          <div class="color-item__text">Main primary accent color</div>
          <code>
            .item {
              background: var(--main-primary-accent-color);
            }
          </code>
          <div class="color-item__usage--main-primary-accent">Usage</div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
  export default {
    name: 'colors',
  };
</script>

<style scoped>

</style>
