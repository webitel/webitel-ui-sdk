<template>
  <div class="wt-brand-loader">
    <svg
      class="wt-brand-loader__svg"
      viewBox="0 0 80 80"
    >
      <rect
        class="wt-brand-loader__svg__rect"
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
@use 'sass:math';

.wt-brand-loader {
  position: relative;
  margin: auto;
  width: var(--loader-size);
  height: var(--loader-size);

  &:before {
    display: block;
    position: absolute;
    top: 37px;
    left: 19px;
    transform: translate(-18px, -18px);
    animation: dotRect var(--loader-animation-duration) linear infinite;
    border-radius: 50%;
    background: var(--wt-loader-md-point-color);
    width: var(--loader-dot-size);
    height: var(--loader-dot-size);
    content: '';
  }

  .wt-brand-loader__svg {
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
      stroke-dasharray: math.div(256, 4) * 3 math.div(256, 4) math.div(256, 4) *
        3 math.div(256, 4);
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
