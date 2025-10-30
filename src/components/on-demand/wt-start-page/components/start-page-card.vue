<template>
  <article class="start-page-card">
    <header class="start-page-card__header">
      <wt-icon
        v-if="card.disabled"
        icon="lock"
      />
      {{ card.name }}
    </header>
    <section class="start-page-card__main-section">
      <img
        :alt="card.name"
        :src="card.image"
      />
      <p class="start-page-card__description">
        {{ card.text }}
      </p>
    </section>
    <footer>
      <wt-button
        :disabled="card.disabled"
        class="start-page-card__button"
        color="secondary"
        wide
        @click="open"
      >
        {{ $t('reusable.open') }}
      </wt-button>
    </footer>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const open = () => {
  console.log('router', router)
  return router.push(props.card.route);
};
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.start-page-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  border-radius: var(--border-radius);
  background-color: var(--content-wrapper-color);
  padding: var(--spacing-xs);
  width: 264px;
  color: var(--text-main-color);

  &__header {
    @extend %typo-heading-4;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__description {
    @extend %typo-body-1;
    display: -webkit-box;
    height: 78px; //in order to cut text after 3rd line:
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
