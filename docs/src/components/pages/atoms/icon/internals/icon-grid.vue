<template>
  <article class="icon-grid">
    <div
      class="icon"
      v-for="(icon, key) of icons"
      :key="key"
    >
      <wt-icon :icon="icon.name" :size="icon.size" color="primary--active"></wt-icon>
      <div class="icon__name">{{icon.name}}</div>
      <div class="icon__size">{{icon.size}}</div>
      <div class="icon__full-name">Full (source) name: {{`icon-${icon.name}--${icon.size}`}}</div>
    </div>
  </article>
</template>

<script>
  import iconsList from './iconsList';

  export default {
    name: 'icon-grid',
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
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 120px);
    grid-gap: 10px;

    .icon {
      text-align: center;
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
