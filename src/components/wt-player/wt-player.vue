<template>
  <aside
    :class="[`wt-player--position-${position}`]"
    class="wt-player"
  >
    <component
      :is="playerType"
      ref="player"
      :autoplay="autoplay"
      :src="src"
      class="wt-player__player"
      controls
      v-on="listeners"
    />

    <!-- The "wt-icon-btn" component is append in to "audio" element by "setCloseIcon" method-->
    <wt-icon-btn
      v-if="closable"
      ref="close-icon"
      class="wt-player__close-icon"
      icon="close"
      @click="$emit('close')"
    />
  </aside>
</template>

<script>
// import Plyr from 'plyr'; // breaks vitepress build, https://webitel.atlassian.net/browse/WTEL-5425?focusedCommentId=639144
import 'plyr/src/sass/plyr.scss';

export default {
  name: 'WtPlayer',
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
    hideDuration: {
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
  emits: ['initialized', 'close'],
  data: () => ({
    player: null,
  }),

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

  methods: {
    async setupPlayer() {
      await this.$nextTick(); // test is failing to render component if element is passed to Plyr as Vue $ref
      if (this.player) this.player.destroy();

      const defaultControls = [
        'play-large',
        'play',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'captions',
        'settings',
        'pip',
        'airplay',
        'fullscreen',
      ];

      const controls = this.hideDuration
        ? defaultControls.filter((control) => control !== 'duration')
        : defaultControls;

      if (this.download) controls.push('download');

      const Plyr = (await import('plyr')).default; // https://webitel.atlassian.net/browse/WTEL-5425?focusedCommentId=639144
      this.player = new Plyr(this.$refs.player, {
        autoplay: this.autoplay,
        loadSprite: false,
        resetOnEnd: this.resetOnEnd,
        invertTime: this.invertTime,
        iconUrl: '',
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
      if (!this.download) {
        this.setupPlayer();
      } else if (typeof this.download === 'string') {
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
//@import './variables.scss';
</style>

<style lang="scss" scoped>
//@import '../../../src/css/main.scss';

.wt-player {
  @extend %typo-body-2;
  bottom: 60px;

  &--position {
    &-sticky {
      position: sticky;
      z-index: 2;
    }

    &-relative {
      position: relative;
      bottom: unset;
    }

    &-static {
      position: static;
    }
  }

    :deep(.plyr) {
      max-width: 100%; // prevents <video> container overflow
      border-radius: var(--border-radius);
      box-shadow: var(--elevation-10);

      .plyr__controls > .plyr__control,
      .plyr__controls > .plyr__controls__item > .plyr__control {
        padding: var(--plyr-controls-icon-padding);
      }

      .plyr__controls > .plyr__control > svg,
      .plyr__controls > .plyr__controls__item > .plyr__control > svg {
        width: var(--plyr-controls-icon-size);
        height: var(--plyr-controls-icon-size);
      }

      .plyr__control--overlaid svg {
        left: 0; // reset plyr style for video "play" button icon
      }

      .plyr__progress__buffer {
        background: var(--wt-player-audio-progress-background);
      }

      .plyr__progress input,
      .plyr__volume input {
        cursor: pointer;

        &::-webkit-slider-thumb {
          transition: var(--transition);
          border: var(--wt-slider-border);
          border-radius: var(--wt-slider-pointer-radius);
          background: var(--wt-slider-pointer-background-color);
          -webkit-appearance: none;
        }

        &::-webkit-slider-runnable-track {
          -webkit-appearance: none;
        }

        &::-moz-range-thumb {
          width: var(--wt-slider-pointer-size);
          height: var(--wt-slider-pointer-size);
          transition: var(--transition);
          border: var(--wt-slider-border);
          border-color: var(--wt-slider-pointer-border-color);
          border-radius: var(--wt-slider-pointer-radius);
          background: var(--wt-slider-pointer-background-color);
          -moz-appearance: none;
        }

        &::-moz-range-track {
          -moz-appearance: none;
        }

        &::-ms-thumb {
          appearance: none;
        }

        &::-ms-track {
          appearance: none;
        }
      }
    }
  }

</style>
