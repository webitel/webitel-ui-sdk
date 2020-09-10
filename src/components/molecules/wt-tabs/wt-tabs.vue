<template>
  <nav class="wt-tabs">
    <button
      class="wt-tab"
      :class="{
        'wt-tab--highlight': tab.value === current.value
      }"
      v-for="(tab) in tabs"
      :value="tab.text"
      :key="tab.value"
      type="button"
      @click="open(tab)"
    >
      <slot :name="tab.value" v-bind="{ tab, current }">
        {{tab.text}}
      </slot>
    </button>

    <div class="wt-tabs__underline">
      <div
        class="wt-tab__underline--highlight"
        :style="{
          width: `${activeLineWidth}px`,
          transform: `translateX(${activeLineOffset}px)`
        }"
      ></div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'wt-tabs',
    props: {
      current: {
        type: Object,
        default: () => ({}),
      },
      tabs: {
        type: Array,
        default: () => [],
      },
    },

    model: {
      prop: 'current',
      event: 'change',
    },

    data: () => ({
      activeLineWidth: 0,
      activeLineOffset: 0,
    }),

    methods: {
      open(value) {
        this.$emit('change', value);
        this.moveActiveLine(value);
      },

      moveActiveLine(newValue) {
        if (!this.current) return;
        if (!this.$refs || !this.$refs[newValue] || !this.$refs[newValue][0]) return;
        const element = this.$refs[newValue][0];
        this.activeLineWidth = element.clientWidth;
        this.activeLineOffset = element.offsetLeft;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-tabs {
    position: relative;
  }

  .wt-tab {
    @extend %typo-body-lg;
    position: relative;
    display: inline-block;
    padding: var(--tab-padding);
    margin: var(--tab-margin);
    color: var(--tab-color);
    background: transparent;
    border: none;
    border-bottom: var(--tab-border);
    border-bottom-color: transparent;
    transition: var(--transition);
    cursor: pointer;
    z-index: var(--tab-z-index);
    outline: none;

    &:hover,
    &:focus, {
      @extend %typo-strong-lg;
      color: var(--tab--hover-color);
    }

    &.wt-tab--highlight {
      @extend %typo-strong-lg;
      color: var(--tab--active-color);
      border-bottom-color: var(--tab--active-border-color);
    }

    // disables bold font resize on hover
    &:after {
      display: block;
      content: attr(value);
      font-family: 'Montserrat Semi', monospace;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }

  // all tabs underline
  .wt-tabs__underline {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--tabs-underiline-height);
    background: var(--tabs-underiline-color);
    z-index: 0;
  }

</style>
