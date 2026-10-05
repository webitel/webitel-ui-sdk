<template>
  <nav
    :class="{
      'wt-tabs--wide': wide,
    }"
    class="wt-tabs"
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="{
        'wt-tab--highlight': tab.value === current.value,
      }"
      :value="tab.text"
      class="wt-tab typo-body-1-bold"
      type="button"
      @click="open(tab)"
    >
      <slot
        :name="tab.value"
        v-bind="{ tab, current }"
      >
        <span style="display: block">{{ tab.text }}</span>
      </slot>
    </button>

    <div class="wt-tabs__underline">
      <div
        :style="{
          width: `${activeLineWidth}px`,
          transform: `translateX(${activeLineOffset}px)`,
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
			if (!this.$refs?.[newValue]?.[0]) return;
			const element = this.$refs[newValue][0];
			this.activeLineWidth = element.clientWidth;
			this.activeLineOffset = element.offsetLeft;
		},
	},
};
</script>

<style scoped>
.wt-tabs {
  display: flex;
  position: relative;
  flex-wrap: nowrap;
  gap: var(--tab-gap);
}

.wt-tabs--wide .wt-tab {
  display: block;
  width: 100%;
}

.wt-tab {
  display: inline-block;
  position: relative;
  z-index: var(--tab-z-index);
  transition: var(--transition);
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  padding-bottom: calc(var(--tab-padding) + var(--tab-underline-height));
  color: var(--wt-tabs-text-color);
}

.wt-tab::before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: var(--tab-underline-border-radius);
  background: transparent;
  height: var(--tab-underline-height);
  content: '';
}

.wt-tab:focus,
.wt-tab:hover {
  color: var(--wt-tabs-text-hover-color);
}

.wt-tab:focus::before,
.wt-tab:hover::before {
  background: var(--wt-tabs-underline-active-color);
}

.wt-tab--highlight {
  color: var(--wt-tabs-text-active-color);
}

.wt-tab--highlight::before {
  background: var(--wt-tabs-underline-active-color);
}

.wt-tab::after {
  display: block;
  visibility: hidden;
  height: 0;
  overflow: hidden;
  content: attr(value);
  font-weight: bold;
}
</style>
