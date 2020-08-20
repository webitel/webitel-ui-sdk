<!--https://codepen.io/adityapunjani/pen/YyQmBZ-->

<template>
  <div class="spinner" :class="color">
    <div class="spinnerContainer active common">
      <div class="spinner-layer layer-1 common">
        <div class="circle-clipper left common">
          <div class="circle common" style="border-width:3px;"></div>
        </div>
        <div class="gap-patch common">
          <div class="circle common" style="border-width:3px;"></div>
        </div>
        <div class="circle-clipper right common">
          <div class="circle common" style="border-width:3px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'spinner',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style lang="scss" scoped>
.common {
  display: inline-block;
  position: relative;
}

.spinner {
  width: (18px);
  height: (18px);
  display: inline-block;
  position: relative;
  text-align: initial;
  color: var(--btn-dark-font-color);

  &.primary {
    color: var(--btn-dark-font-color);
  }

  &.secondary {
    color: var(--btn-secondary-color);
  }

  &.success {
    color: var(--btn-light-font-color);
  }

  &.transfer {
    color: var(--btn-light-font-color);
  }

  &.danger {
    color: var(--btn-light-font-color);
  }
}

.spinnerContainer {
  width: 100%;
  height: 100%;
  direction: ltr;
}

.spinnerContainer.active {
  animation: container-rotate 1568ms linear infinite;
}

@keyframes container-rotate {
  to {
    transform: rotate(360deg)
  }
}

.spinner-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.active .spinner-layer.layer-1 {
  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both;
}

@keyframes fill-unfill-rotate {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  to {
    transform: rotate(1080deg);
  }
}

.gap-patch {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 45%;
  width: 10%;
  height: 100%;
  overflow: hidden;
  border-color: inherit;
}

.gap-patch .circle {
  width: 1000%;
  left: -450%;
}

.circle-clipper {
  display: inline-block;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-color: inherit;
}

.circle-clipper .circle {
  width: 200%;
}

.circle {
  box-sizing: border-box;
  height: 100%;
  border-style: solid;
  border-color: inherit;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  animation: none;
}

.circle-clipper.left .circle {
  border-right-color: transparent !important;
  transform: rotate(129deg);
}

.circle-clipper.right .circle {
  left: -100%;
  border-left-color: transparent !important;
  transform: rotate(-129deg);
}

.active .circle-clipper.left .circle {
  animation: left-spin 1333ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both;
}

.active .circle-clipper.right .circle {
  animation: right-spin 1333ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both;
}

@keyframes left-spin {
  from {
    transform: rotate(130deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(130deg);
  }
}

@keyframes right-spin {
  from {
    transform: rotate(-130deg);
  }
  50% {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(-130deg);
  }
}
</style>
