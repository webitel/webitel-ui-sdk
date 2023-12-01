<!--https://codepen.io/zapdev/pen/MYJRaj-->

<template>
  <div
    class="wt-loader--sm"
    :class="`wt-loader--sm--${color}`"
  >
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'main',
      description: '["main", "icon", "on-dark", "on-light"]',
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-loader--sm {
  width: 24px;
  height: 24px;

  svg {
    animation: rotate 1.5s linear infinite;
    height: 100%;
    width: 100%;
  }

  circle {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite 0s;
    //color 6s ease-in-out infinite -0.75s
    stroke-linecap: round;
    fill: none;
    stroke: var(--contrast-color);
    stroke-width: 3;
  }
  &--main circle {
    stroke: var(--wt-loader-sm-path-main-color);
  }
  &--icon circle {
    stroke: var(--wt-loader-sm-path-icon-color);
  }
  &--on-light circle {
    stroke: var(--wt-loader-sm-path-on-light-color);
  }
  &--on-dark circle {
    stroke: var(--wt-loader-sm-path-on-dark-color);
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
</style>
