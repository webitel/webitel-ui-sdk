<template>
  <article class="start-page-card">
    <header class="start-page-card__header">
      <wt-icon v-if="card.disabled" icon="lock"/>
      {{ card.name }}
    </header>
    <section class="start-page-card__main-section">
      <img :src="card.image" :alt="card.name">
      <p class="start-page-card__description">
        {{ card.text }}
      </p>
    </section>
    <footer>
      <wt-button
        class="start-page-card__button"
        :disabled="card.disabled"
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
    return router.push(props.card.route);
  };
</script>

<style lang="scss" scoped>
.start-page-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 264px;
  padding: var(--spacing-xs);
  border-radius: var(--border-radius);
  background-color: var(--content-wrapper-color);
  color: var(--text-main-color);

  &__header {
    @extend %typo-heading-4;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__description {
    @extend %typo-body-1;
    height: 78px;
    //in order to cut text after 3rd line:
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

</style>
