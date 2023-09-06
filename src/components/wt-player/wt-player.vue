<template>
  <aside
    class="wt-player"
    :class="[`wt-player--position-${position}`]"
  >
    <component
      :is="playerType"
      class="wt-player__player"
      ref="player"
      :src="src"
      :autoplay="autoplay"
      controls
      v-on="listeners"
    ></component>

    <!-- The "wt-icon-btn" component is append in to "audio" element by "setCloseIcon" method-->
    <wt-icon-btn
      v-if="closable"
      class="wt-player__close-icon"
      ref="close-icon"
      icon="close"
      @click="$emit('close')"
    ></wt-icon-btn>
  </aside>
</template>

<script>
import Plyr from 'plyr';

export default {
  name: 'wt-player',
  props: {
    src: {},
    autoplay: {
      type: Boolean,
      default: true,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    download: {
      type: [String, Function, Boolean],
      default: () => (url) => url.replace('/stream', '/download'),
    },
    mime: {
      type: String,
      default: 'audio',
    },
    // plyr-specific options
    resetOnEnd: {
      type: Boolean,
      default: false,
    },
    invertTime: {
      type: Boolean,
      default: true,
    },
    // plyr is caching volume settings so we should reset them at init
    resetVolume: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'sticky',
    },
  },
  data: () => ({
    player: null,
  }),

  watch: {
    src() {
      this.setupDownload();
    },
    download() {
      this.setupDownload();
    },
  },

  mounted() {
    this.setupPlayer();
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
      };
    },
    playerType() {
      return this.mime.includes('video') ? 'video' : 'audio';
    },
  },

  methods: {
    async setupPlayer() {
      await this.$nextTick(); // test is failing to render component if element is passed to Plyr as Vue $ref
      const baseURL = this.$baseURL || process.env.BASE_URL;
      if (this.player) this.player.destroy();
      const controls = [
        'play-large', 'play', 'progress', 'current-time',
        'mute', 'volume', 'captions', 'settings', 'pip',
        'airplay', 'fullscreen',
      ];
      if (this.download) controls.push('download');
      this.player = new Plyr(this.$refs.player, {
        // this.player = new Plyr('.wt-player__player', {
        autoplay: this.autoplay,
        loadSprite: false,
        resetOnEnd: this.resetOnEnd,
        invertTime: this.invertTime,
        iconUrl: `${baseURL}img/plyr.svg`,
        controls,
        loop: {
          active: this.loop,
        },
      });

      if (this.resetVolume) this.makeVolumeReset();
      if (this.download) this.setupDownload();

      if (this.closable) this.appendCloseIcon();
      this.$emit('initialized', this.player);
    },
    makeVolumeReset() {
      this.player.volume = 1;
      this.player.muted = false;
    },
    setupDownload() {
      if (!this.download) this.setupPlayer();
      else if (typeof this.download === 'string') {
        this.player.download = this.download;
      } else if (typeof this.download === 'function') {
        this.player.download = this.download(this.src);
      }
    },
    appendCloseIcon() {
      const plyrControls = this.$refs.player.plyr?.elements?.controls;
      const closeIcon = this.$refs['close-icon'].$el;
      if (plyrControls) {
        plyrControls.append(closeIcon);
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../../node_modules/plyr/src/sass/plyr';
@import './variables.scss';

.wt-player {
  @extend %typo-body-2;
  bottom: 60px;

  &--position {
    &-sticky {
      position: sticky;
    }

    &-relative {
      position: relative;
      bottom: unset;
    }

    &-static {
      position: static;
    }
  }

  .plyr {
    max-width: 100%; // prevents <video> container overflow
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  &__close-icon {
    //transform: translate(var(--player-close-icon-transform-translate-x),
    //  var(--player-close-icon-transform-translate-y));
  }

  .plyr__control:hover, {
    background: var(--accent-secondary-color);
    color: var(--text-primary-color);
  }

  .plyr__control--overlaid svg {
    left: 0; // reset plyr style for video "play" button icon
  }

  //.plyr__control[role='menuitemradio']::before,
  //.plyr__control[role='menuitemradio']:hover::before {
  //  border: 2px solid var(--secondary-color);
  //  background: var(--main-color);
  //}
  //
  //.plyr__control[role='menuitemradio']::after {
  //  background: var(--secondary-color);
  //}
}

</style>