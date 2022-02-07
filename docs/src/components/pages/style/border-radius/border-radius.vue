<template>
  <section class="border-radius">
    <h2>Border Radius</h2>
    <div class="border-radius__wrapper">
      <article
        v-for="(radius, key) of bRadius"
        :key="key"
        :style="{ 'border-radius': `var(${radius.name})`}"
        class="border-radius-item"
      >
        <div class="border-radius-item__name">{{ radius.name }}: {{ radius.value }}</div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'border-radius',
  data: () => ({
    bRadius: [
      {
        name: '--border-radius',
        value: getComputedStyle(document.documentElement).getPropertyValue('--border-radius'),
      },
      {
        name: '--border-radius--pill',
        value: getComputedStyle(document.documentElement).getPropertyValue('--border-radius--pill'),
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.border-radius__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: var(--spacing-3xl);
}

.border-radius-item {
  padding: 10px;
  background: var(--main-color);
  border: 2px solid var(--accent-color);

  &__name {
    @extend %typo-subtitle-2;
  }
}
</style>
