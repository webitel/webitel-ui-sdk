<template>
  <section class="wt-error-page">
    <article class="wt-error-page__wrapper">
      <img
        class="wt-error-page__img"
        :src="errorPic.src"
        :alt="errorPic.alt"
      >
      <h2
        class="wt-error-page__title">{{ errorTitle }}</h2>
      <p class="wt-error-page__text">{{ errorText }}</p>
      <wt-button
        class="wt-error-page__action"
        @click="$emit('back')"
      >{{ $t('webitelUI.errorPages.goBack') }}
      </wt-button>
    </article>
  </section>
</template>

<script>
import pic403 from '../../assets/components/organisms/wt-error-page/403.svg';
import pic404 from '../../assets/components/organisms/wt-error-page/404.svg';

export default {
  name: 'wt-error-page',
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
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  padding: 90px;
  background: var(--main-color);

  &__wrapper {
    text-align: center;
    //color: var(--text-contrast-color);
  }

  &__img {
    max-width: 65vw;
    width: 778px;
    user-select: none;
  }

  &__title {
    text-transform: uppercase;
    margin-top: 69px;
  }

  &__text {
    margin-top: 21px;
  }

  &__action {
    margin-top: 40px;
  }
}
</style>
