<template>
  <section class="icon-grid">
    <wt-select
      class="icon-grid__color-select"
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
          :size="icon.size"
          :color="iconColor"
        ></wt-icon>
        <div class="icon__name">{{ icon.name }}</div>
        <div class="icon__size">{{ icon.size }}</div>
        <div class="icon__full-name">Full (source) name: {{ `icon-${icon.name}--${icon.size}` }}
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import iconsList from './iconsList';

export default {
  name: 'icon-grid',
  data: () => ({
    iconColor: 'default',
    iconColorOptions: ['default', 'contrast', 'active', 'disabled', 'success', 'danger', 'transfer', 'hold'],
  }),
  computed: {
    icons() {
      return iconsList.map((icon) => ({
        name: icon.slice(5, -4),
        size: icon.slice(-2),
      })).sort((icon1, icon2) => {
        const sortOrder = ['xl', 'lg', 'md', 'sm', 'xs'];
        return sortOrder.indexOf(icon1.size) - sortOrder.indexOf(icon2.size);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-grid__color-select {
  max-width: 400px;
  margin-bottom: var(--component-spacing);
}

.icon-grid__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-gap: var(--component-spacing);

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
    @extend %typo-strong-md;
  }

  .icon__size {
    @extend %typo-body-md;
  }

  .icon__full-name {
    @extend %typo-body-sm;
  }
}
</style>
