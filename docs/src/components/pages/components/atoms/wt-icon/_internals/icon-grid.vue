<template>
  <section class="icon-grid">
    <h3 id="icon-demo"><a href="#icon-demo">Icon demo:</a></h3>
    <wt-select
      class="icon-grid__select"
      v-model="iconSize"
      label="Icons size"
      :options="iconSizeOptions"
      :track-by="null"
      :clearable="false"
    ></wt-select>
    <wt-select
      class="icon-grid__select"
      v-model="iconColor"
      label="Icons color"
      :options="iconColorOptions"
      :track-by="null"
      :clearable="false"
    ></wt-select>
    <article class="icon-grid__grid">
      <div
        class="icon-grid__icon-wrapper"
        :class="{ 'icon-grid__icon-wrapper--contrast-bg': iconColor === 'contrast' }"
        v-for="(icon, key) of icons"
        :key="key"
      >
        <wt-icon
          :icon="icon.name"
          :size="iconSize"
          :color="iconColor"
        ></wt-icon>
        <div class="icon__name">{{ icon.name }}</div>
      </div>
    </article>
  </section>
</template>

<script>
import iconsList from './iconsList';

export default {
  name: 'icon-grid',
  data: () => ({
    iconSize: 'md',
    iconSizeOptions: ['sm', 'md', 'lg', 'xl'],
    iconColor: 'default',
    iconColorOptions: ['default', 'contrast', 'active', 'disabled', 'success', 'danger', 'transfer', 'hold'],
  }),
  computed: {
    icons() {
      return iconsList.map((icon) => ({
        name: icon,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-grid__select {
  max-width: 400px;
  margin: 0 var(--spacing-xs) var(--spacing-xs) 0;
}

.icon-grid__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-gap: var(--spacing-xs);

  .icon-grid__icon-wrapper {
    text-align: center;
    padding: 5px;

    &--contrast-bg {
      background: var(--contrast-color);
    }
  }

  .wt-icon {
    margin: auto auto 5px;
  }

  .icon__name {
    @extend %typo-subtitle-2;
  }
}
</style>
