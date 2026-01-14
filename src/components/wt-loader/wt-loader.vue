<template>
  <wt-brand-loader
    v-if="size === 'md'"
    :color="color"
    class="wt-loader"
  />
  <wt-spinner-loader
    v-else
    class="wt-loader"
    :color="color"
    :size="size"
  />
</template>

<script>
import WtBrandLoader from './_internals/wt-brand-loader.vue';
import WtSpinnerLoader from './_internals/wt-spinner-loader.vue';

export default {
	name: 'WtLoader',
	components: {
		WtBrandLoader,
		WtSpinnerLoader,
	},
	props: {
		/**
		 * Loader size
		 * @type {string}
		 * @default 'md'
		 * @options ['sm', 'md']
		 */
		size: {
			type: String,
			default: 'md',
			description: '["xs", "sm", "md"]',
		},
		/**
		 * Loader color. Works only for sm loader
		 * @type {string}
		 * @default 'main'
		 * @options ['main', 'contrast', 'icon']
		 */
		color: {
			type: String,
			default: 'main',
			description: '["main", "icon", "on-dark", "on-light"]',
		},
	},
};
</script>

