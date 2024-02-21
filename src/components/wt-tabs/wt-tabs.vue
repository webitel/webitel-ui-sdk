<template>
  <nav
    class="wt-tabs"
    :class="{
      'wt-tabs--wide': wide,
    }"
  >
    <button
      v-for="(tab) in tabs"
      :key="tab.value"
      :class="{
        'wt-tab--highlight': tab.value === current.value,
      }"
      :value="tab.text"
      class="wt-tab"
      type="button"
      @click="open(tab)"
    >
      <slot
        v-bind="{ tab, current }"
        :name="tab.value"
      >
        <span style="display: block;">{{ tab.text }}</span>
      </slot>
    </button>

    <div class="wt-tabs__underline">
      <div
        :style="{
          width: `${activeLineWidth}px`,
          transform: `translateX(${activeLineOffset}px)`
        }"
        class="wt-tab__underline--highlight"
      />
    </div>
  </nav>
</template>

<script>
export default {
  name: 'WtTabs',

  model: {
    prop: 'current',
    event: 'change',
  },
  props: {
    current: {
      type: Object,
      default: () => ({}),
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    wide: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'change',
  ],
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

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-tabs {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  gap: var(--tab-gap);

  &--wide {
    .wt-tab {
      display: block;
      width: 100%;
    }
  }
}

.wt-tab {
  @extend %typo-body-1;
  position: relative;
  z-index: var(--tab-z-index);
  display: inline-block;
  padding-bottom: var(--tab-padding);
  cursor: pointer;
  transition: var(--transition);
  color: var(--wt-tabs-text-color);
  border: none;
  border-bottom: var(--tab-border);
  border-bottom-color: transparent;
  outline: none;
  background: transparent;

  &:hover,
  &:focus, {
    color: var(--wt-tabs-text-hover-color);
    border-bottom-color: var(--wt-tabs-underline-active-color);
  }

  &.wt-tab--highlight {
    color: var(--wt-tabs-text-active-color);
    border-bottom-color: var(--wt-tabs-underline-active-color);
  }

  //// disables bold font resize on hover
  &:after {
    display: block;
    visibility: hidden;
    overflow: hidden;
    height: 0;
    content: attr(value);
    font-weight: bold;
  }
}

</style>
