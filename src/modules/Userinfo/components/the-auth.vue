<template>
  <div class="auth-wrap">
    <div v-show="!isLoaded" class="auth-loader">
      <wt-loader/>
    </div>
    <iframe
      class="auth"
      :src="authURL"
      @load="isLoaded = true"
    >
      <p>Your browser does not support iframes.</p>
    </iframe>
  </div>
</template>

<script>
import AuthAPI from '../api/auth';

const authURL = process ? process.env.VUE_APP_AUTH_MODULE_URL : import.meta.env.VITE_AUTH_MODE_URL;

export default {
  name: 'auth',
  props: {
    namespace: {
      type: String,
      default: 'userinfo',
    },
  },
  data: () => ({
    authURL,
    isLoaded: false,
  }),

  mounted() {
    window.addEventListener('message', this.authMessageHandler, false);
  },
  destroyed() {
    window.removeEventListener('message', this.authMessageHandler, false);
  },

  methods: {
    openSession(payload) {
      return this.$store.dispatch(`${this.namespace}/OPEN_SESSION`, payload);
    },
    async authMessageHandler(event) {
      if (event.data.accessToken) {
        // eslint-disable-next-line import/no-named-as-default-member
        await AuthAPI.setToken(event.data.accessToken);
        await this.openSession();
        await this.$router.replace('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-wrap {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .wt-loader {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }

  .auth {
    height: 100%;
    width: 100%;
  }
}
</style>
