<template>
  <nav class="wt-headline-nav">
    <div
      class="wt-headline-nav__wrapper"
      v-for="(singlePath, key) of path"
      :key="key"
    >
      <span v-if="key !== 0" class="wt-headline-nav__indicator"></span>
      <h1 class="wt-headline-nav__title">
        <router-link
          v-if="singlePath.route"
          class="wt-headline-nav__text wt-headline-nav__title-link"
          :to="singlePath.route"
        >{{ singlePath.name }}
        </router-link>
        <span v-else class="wt-headline-nav__text">{{ singlePath.name }}</span>
      </h1>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'wt-headline-nav',
  props: {
    path: {
      type: Array,
      required: true,
      // PATH EXAMPLE
      // default: () => [
      //   { name: 'directory' },
      //   { name: 'users', route: '/directory/users' },
      //   { name: 'adm', route: '/directory/users/3' },
      // ],
    },
  },
};
</script>

<style lang="scss" scoped>
@import './variables.scss';

.wt-headline-nav {
  display: flex;
  align-items: center;
  max-width: 100%;
}

.wt-headline-nav__wrapper {
  display: flex;
  align-items: center;
}

.wt-headline-nav__indicator {
  display: inline-block;
  width: var(--headline-nav-indicator-size);
  height: var(--headline-nav-indicator-size);
  margin: 0 var(--headline-nav-indicator-margin);
  background: var(--icon-color);
  border-radius: 50%;
  flex-shrink: 0;
}

.wt-headline-nav__title {
  @extend %typo-subtitle-1;
}

.wt-headline-nav__text {
  color: var(--text-outline-color);
}

.wt-headline-nav__wrapper:last-child {
  min-width: 0;

  .wt-headline-nav__indicator {
    background: var(--icon-color-accent);
  }

  .wt-headline-nav__title {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .wt-headline-nav__text {
    color: var(--text-primary-color);
  }
}
</style>
