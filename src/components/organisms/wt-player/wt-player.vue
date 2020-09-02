<template>
  <aside class="wt-player">
    <audio
      id="wt-player__player"
      :src="src"
      :autoplay="autoplay"
      controls
    >
    </audio>
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
  methods: {
    setupPlayer() {
      if (this.player) this.player.restart();
      const controls = ['play-large', 'play', 'progress', 'current-time',
        'mute', 'volume', 'captions', 'settings', 'pip',
        'airplay', 'fullscreen'];
      if (this.download) controls.push('download');
      this.player = new Plyr('#wt-player__player', {
        autoplay: this.autoplay,
        loadSprite: false,
        iconUrl: 'img/plyr.svg',
        controls,
        loop: {
          active: this.loop,
        },
      });
    },
    setupDownload() {
      if (!this.download) this.setupPlayer();
      else if (typeof this.download === 'string') {
        this.player.download = this.download;
      } else if (typeof this.download === 'function') {
        this.player.download = this.download(this.src);
      }
    },
  },
};
</script>

<style lang="scss">
@import "~plyr/src/sass/plyr.scss";

:root {
  --plyr-color-main: var(--main-accent-color);
  --plyr-audio-control-color: var(--icon-primary-color);
  // --plyr-control-toggle-checked-background: var(--main-primary-color);
}

.wt-player {
  @extend %typo-body-md;
  position: sticky;
  bottom: 60px;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);

  .plyr__control:hover, {
    background: var(--main-option-hover-color);
    color: var(--text-primary-color);
  }

  //.plyr__control[role='menuitemradio']::before,
  //.plyr__control[role='menuitemradio']:hover::before {
  //  border: 2px solid var(--main-secondary-color);
  //  background: var(--main-primary-color);
  //}
  //
  //.plyr__control[role='menuitemradio']::after {
  //  background: var(--main-secondary-color);
  //}
}

</style>
