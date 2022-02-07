<template>
  <section class="elevations">
    <h2>Elevations</h2>
    <div class="elevations__wrapper">
      <article
        v-for="(elevation, key) of elevations"
        :key="key"
        :style="{ 'box-shadow': `var(${elevation.code})`}"
        class="elevation-item"
      >
        <div class="elevation-item__name">{{ elevation.name }}</div>
        <code class="elevation-item__code">{{ elevation.code }}</code>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'elevations',
  data: () => ({
    elevations: [...Array(10).keys()]
      .map((i) => ({
        name: `Elevation ${i + 1}`,
        code: `--elevation-${i + 1}`,
        description: '',
      })),
  }),
};
</script>

<style lang="scss" scoped>
.elevations__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: var(--spacing-3xl);
}

.elevation-item {
  padding: 10px;
  border-radius: var(--border-radius);
  background: var(--main-color);

  &__name {
    @extend %typo-subtitle-1;
  }
}
</style>
