<template>
  <section class="shadows">
    <h2>Shadows</h2>
    <div class="shadows__wrapper">
      <article
        class="shadow-item"
        v-for="(shadow, key) of shadows"
        :key="key"
        :style="{ 'box-shadow': `var(${shadow.code})`}"
      >
        <div class="shadow-item__name">{{ shadow.name }}</div>
        <code class="shadow-item__code">{{ shadow.code }}</code>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'shadows',
  data: () => ({
    shadows: [
      {
        name: 'Down-50',
        code: '--shadow-style-down-50',
        description: '',
      },
      {
        name: 'Down-100',
        code: '--shadow-style-down-100',
        description: '',
      },
      {
        name: 'Up-50',
        code: '--shadow-style-up-50',
        description: '',
      },
      {
        name: 'Up-100',
        code: '--shadow-style-up-100',
        description: '',
      },
      {
        name: 'Font',
        code: '--shadow-style-font',
        description: '',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.shadows__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 460px);
  grid-gap: 20px;
}

.shadow-item {
  padding: 10px;
  background: var(--main-color);
  border-radius: var(--border-radius);

  &__name {
    @extend %typo-subtitle-1;
  }
}
</style>
