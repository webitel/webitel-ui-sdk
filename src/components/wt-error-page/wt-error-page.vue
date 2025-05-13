<template>
  <section class="wt-error-page">
    <article class="wt-error-page__wrapper">
      <img
        :alt="errorPic.alt"
        :src="errorPic.src"
        class="wt-error-page__img"
      />
      <h2 class="wt-error-page__title">
        {{ errorTitle }}
      </h2>
      <p class="wt-error-page__text">
        {{ errorText }}
      </p>
      <wt-button
        class="wt-error-page__action"
        @click="$emit('back')"
      >
        {{ $t('webitelUI.errorPages.goBack') }}
      </wt-button>
    </article>
  </section>
</template>

<script>
import pic403 from '../../assets/components/organisms/wt-error-page/403.svg';
import pic404 from '../../assets/components/organisms/wt-error-page/404.svg';

export default {
  name: 'WtErrorPage',
  props: {
    type: {
      type: String,
      required: true,
      options: ['403', '404'],
    },
  },
  computed: {
    errorPic() {
      switch (this.type) {
        case '403':
          return { src: pic403, alt: 'Forbidden pic' };
        case '404':
          return { src: pic404, alt: 'Not found pic' };
        default:
          return '';
      }
    },
    errorTitle() {
      switch (this.type) {
        case '403':
          return this.$t('webitelUI.errorPages.page403.title');
        case '404':
          return this.$t('webitelUI.errorPages.page404.title');
        default:
          return '';
      }
    },
    errorText() {
      switch (this.type) {
        case '403':
          return this.$t('webitelUI.errorPages.page403.text');
        case '404':
          return this.$t('webitelUI.errorPages.page404.text');
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: var(--wt-error-page-background-color);
  padding: 90px;
  min-width: 100vw;
  min-height: 100vh;

  &__wrapper {
    color: var(--wt-error-page-text-color);
    text-align: center;
  }

  &__img {
    width: 778px;
    max-width: 65vw;
    user-select: none;
  }

  &__title {
    margin-top: 69px;
    text-transform: uppercase;
  }

  &__text {
    margin-top: 21px;
  }

  &__action {
    margin-top: 40px;
  }
}
</style>
