<template>
  <nav class="wt-headline-nav">
    <div
      v-for="(singlePath, key) of path"
      :key="key"
      class="wt-headline-nav__wrapper"
    >
      <span
        v-if="key !== 0"
        class="wt-headline-nav__indicator"
      />
      <h1 class="wt-headline-nav__title">
        <router-link
          v-if="singlePath.route"
          :to="singlePath.route"
          class="wt-headline-nav__text wt-headline-nav__text--link"
        >
          {{ singlePath.name }}
        </router-link>
        <span
          v-else
          class="wt-headline-nav__text"
          >{{ singlePath.name }}</span
        >
      </h1>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  /**
   * PATH EXAMPLE
   *  default: () => [
   *      { name: 'directory' },
   *      { name: 'users', route: '/directory/users' },
   *      { name: 'adm', route: '/directory/users/3' },
   *    ],
   */
  path: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../css/styleguide/styleguide';

.wt-headline-nav {
  display: flex;
  align-items: center;
  max-width: 100%;
  gap: var(--headline-nav-gap);
}

.wt-headline-nav__wrapper {
  display: flex;
  align-items: center;
  gap: var(--headline-nav-dot-gap);
}

.wt-headline-nav__indicator {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  width: var(--icon-md-size);
  height: var(--icon-md-size);

  &:before {
    display: block;
    width: var(--headline-nav-indicator-size);
    height: var(--headline-nav-indicator-size);
    content: '';
    border-radius: 50%;
    background: var(--headline-nav-indicator-color);
  }
}

.wt-headline-nav__title {
  @extend %typo-subtitle-1;
}

.wt-headline-nav__text {
  color: var(--text-main-color);
}

.wt-headline-nav__wrapper:last-child {
  min-width: 0;

  .wt-headline-nav__indicator {
    &:before {
      background: var(--headline-nav-accent-indicator-color);
    }
  }

  .wt-headline-nav__title {
    word-break: break-word;
  }
}
</style>
