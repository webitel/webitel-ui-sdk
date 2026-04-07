import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import AppearanceStoreModule from '../../store/AppearanceStoreModule.js';
import WtDarkModeSwitcher from '../wt-dark-mode-switcher.vue';

describe('WtDarkModeSwitcher', () => {
	let wrapper;

	beforeEach(() => {
		const store = createStore(new AppearanceStoreModule().getModule());
		localStorage.removeItem('theme');
		document.documentElement.classList.remove('theme--dark');

		wrapper = shallowMount(WtDarkModeSwitcher, {
			global: {
				plugins: [
					store,
				],
			},
		});
	});

	it('should render component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('toggles dark mode class', async () => {
		expect(
			window.document.documentElement.classList.contains('theme--dark'),
		).toBe(false);
		wrapper
			.findComponent({
				name: 'wt-switcher',
			})
			.vm.$emit('update:model-value');
		await wrapper.vm.$nextTick();
		expect(
			window.document.documentElement.classList.contains('theme--dark'),
		).toBe(true);
		expect(localStorage.getItem('theme')).toBe('dark');
	});
});
