<template>
  <div class="wt-loader wt-loader--md">
    <svg
      class="wt-loader--md__svg"
      viewBox="0 0 80 80"
    >
      <rect
        class="wt-loader--md__svg__rect"
        height="64"
        width="64"
        x="8"
        y="8"
      />
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// https://codepen.io/aaroniker/pen/omvYNZ
.wt-loader--md {
  position: relative;
  width: var(--loader-size);
  height: var(--loader-size);
  margin: auto;

  &:before {
    position: absolute;
    top: 37px;
    left: 19px;
    display: block;
    width: var(--loader-dot-size);
    height: var(--loader-dot-size);
    content: '';
    transform: translate(-18px, -18px);
    animation: dotRect var(--loader-animation-duration) linear infinite;
    border-radius: 50%;
    background: var(--wt-loader-md-point-color);
  }

  .wt-loader--md__svg {
    display: block;
    width: 100%;
    height: 100%;

    &__rect {
      animation: pathRect var(--loader-animation-duration) linear infinite;
      fill: none;
      stroke: var(--wt-loader-md-path-color);
      stroke-width: 10px;
      stroke-linejoin: round;
      stroke-linecap: round;
      stroke-dasharray: (256 / 4 * 3) (256 / 4) (256 / 4 * 3) (256 / 4);
      stroke-dashoffset: 0;
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
