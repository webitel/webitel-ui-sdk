<template>
  <div class="wt-loader wt-loader--md">
    <svg
      class="wt-loader--md__svg"
      viewBox="0 0 80 80"
    >
      <rect
        class="wt-loader--md__svg__rect"
        x="8"
        y="8"
        width="64"
        height="64"
      />
    </svg>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="scss" scoped>
  // https://codepen.io/aaroniker/pen/omvYNZ
  .wt-loader--md {
    position: relative;
    width: var(--loader-size);
    height: var(--loader-size);
    margin: auto;

    &:before {
      content: '';
      width: var(--loader-dot-size);
      height: var(--loader-dot-size);
      display: block;
      position: absolute;
      top: 37px;
      left: 19px;
      transform: translate(-18px, -18px);
      background: var(--loader-dot-color);
      border-radius: 50%;
      animation: dotRect var(--loader-animation-duration) linear infinite;
    }

    .wt-loader--md__svg {
      display: block;
      width: 100%;
      height: 100%;

      &__rect {
        fill: none;
        stroke: var(--loader-path-color);
        stroke-width: 10px;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-dasharray: (256 / 4 * 3) (256 / 4) (256 / 4 * 3) (256 / 4);
        stroke-dashoffset: 0;
        animation: pathRect var(--loader-animation-duration) linear infinite;
      }
    }
  }

  @keyframes pathRect {
    25% {
      stroke-dashoffset: 64;
    }
    50% {
      stroke-dashoffset: 128;
    }
    75% {
      stroke-dashoffset: 192;
    }
    100% {
      stroke-dashoffset: 256;
    }
  }

  @keyframes dotRect {
    25% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(18px, -18px);
    }
    75% {
      transform: translate(0, -36px);
    }
    100% {
      transform: translate(-18px, -18px);
    }
  }
</style>
