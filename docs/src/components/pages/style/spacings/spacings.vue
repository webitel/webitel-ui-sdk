<template>
  <section class="spacings">
    <h2>Spacings</h2>
    <article
      v-html="generalMd"
      id="general"
      class="markdown-body"
    ></article>
    <article class="spacings__spacing-example-wrapper">
      <div
        class="spacing-example"
        v-for="({ name, value }, key) of spacings"
        :key="key"
        :class="[
          `spacing-example--${name}`,
        ]"
        :style="`padding: ${value}`"
      >
        <div class="spacing-example__text">{{ name }}: {{ value }}</div>
      </div>
    </article>
    <article
      v-html="layoutsMd"
      id="layouts"
      class="markdown-body"
    ></article>
  </section>
</template>

<script>
import generalMd from './md/general';
import layoutsMd from './md/layouts';

export default {
  name: 'spacings',
  computed: {
    spacings() {
      return ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
        .map((name) => ({
          name,
          value: getComputedStyle(document.documentElement).getPropertyValue(`--spacing-${name}`),
        }));
    },
    generalMd() {
      return generalMd[this.$i18n.locale] || generalMd.default;
    },
    layoutsMd() {
      return layoutsMd[this.$i18n.locale] || layoutsMd.default;
    },
  },
};
</script>

<style lang="scss" scoped>
.spacings {
  .spacings__spacing-example-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-gap: var(--spacing-3xl);
    margin: var(--spacing-3xl) 0;
  }
  .spacing-example {
    background: var(--transfer-color);
    margin-bottom: var(--spacing-3xl);

    &__text {
      background: var(--main-color);
    }
  }
}
</style>
