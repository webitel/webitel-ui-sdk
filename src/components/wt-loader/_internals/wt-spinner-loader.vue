<!--https://codepen.io/zapdev/pen/MYJRaj-->

<template>
  <div
    :class="[
      `wt-spinner-loader--${color}`,
      `wt-spinner-loader--${size}`,
    ]"
    class="wt-spinner-loader"
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
    size: {
      type: String,
      default: 'sm',
      description: '["xs", "sm"]',
    }
  },
};
</script>

<style lang="scss" scoped>
.wt-spinner-loader {
  &--xs {
    width: var(--icon-sm-size);
    height: var(--icon-sm-size);
  }

  &--sm {
    width: var(--icon-md-size);
    height: var(--icon-md-size);
  }

  svg {
    animation: rotate 1.5s linear infinite;
    width: 100%;
    height: 100%;
  }

  circle {
    animation: dash 1.5s ease-in-out infinite 0s;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
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
