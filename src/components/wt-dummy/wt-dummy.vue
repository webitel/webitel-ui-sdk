<template>
  <div class="wt-dummy">
    <div class="wt-dummy__img">
      <img :height="size" :src="src || dummy" :width="size" alt="dummy-picture" />
    </div>
    <p v-if="!hiddenText" class="wt-dummy__text typo-body-1">
      {{ text || $t('webitelUI.dummy.text') }}
    </p>
    <wt-button v-if="showAction" @click="emits('create')">
      {{ buttonText || $t('reusable.add') }}
    </wt-button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import dummyDark from '../../assets/components/molecules/wt-dummy/dummyDark.svg';
import dummyLight from '../../assets/components/molecules/wt-dummy/dummyLight.svg';

/**
 * @emits {void} create - Fires when create button is clicked
 */
const props = defineProps({
	/**
	 * Image source URL
	 * @type {string}
	 */
	src: {
		type: String,
	},
	/**
	 * Dummy text content
	 * @type {string}
	 * @default 'There are no records yet'
	 */
	text: {
		type: String,
	},
	/**
	 * Button text
	 * @type {string}
	 * @default localized "ADD"
	 */
	buttonText: {
		type: String,
	},
	/**
	 * The prop controls the display of the button for adding new items
	 * @type {boolean}
	 * @default false
	 */
	showAction: {
		type: Boolean,
		default: false,
	},
	/**
	 * Image size
	 * @type {string | number}
	 * @default 200
	 */
	size: {
		type: [
			String,
			Number,
		],
		default: 200,
	},
	/**
	 * If value is true - hides in markup "text"
	 * @type {boolean}
	 * @default false
	 */
	hiddenText: {
		type: Boolean,
		default: false,
	},
	/**
	 * Dark mode flag
	 * @type {boolean}
	 * @default false
	 */
	darkMode: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits([
	'create',
]);

const dummy = computed(() => (props.darkMode ? dummyDark : dummyLight));
</script>

<style scoped>
.wt-dummy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  text-align: center;
}

.wt-dummy__img {
  width: 200px;
  height: 200px;
}

.wt-dummy__text {
  color: var(--wt-dummy-text-color);
}
</style>
