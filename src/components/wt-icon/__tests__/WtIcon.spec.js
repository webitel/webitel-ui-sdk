import { shallowMount } from '@vue/test-utils';

import WtIcon from '../wt-icon.vue';

describe('WtIcon', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtIcon, {
			props: {
				icon: 'icon-name',
			},
		});
		expect(wrapper.classes('wt-icon')).toBe(true);
	});
	it('correctly computes icon name', () => {
		const iconName = 'jest-bucket';
		const wrapper = shallowMount(WtIcon, {
			props: {
				icon: 'bucket',
				size: 'sm',
				iconPrefix: 'jest',
			},
		});
		expect(wrapper.vm.iconSvg).toBe(iconName);
	});

	it('applies size and color classes', () => {
		const wrapper = shallowMount(WtIcon, {
			props: {
				icon: 'bucket',
				size: 'sm',
				color: 'error',
			},
		});

		expect(wrapper.classes()).toEqual(
			expect.arrayContaining([
				'wt-icon--size-sm',
				'wt-icon--color-error',
			]),
		);
	});

	it('applies the disabled class when disabled', () => {
		const wrapper = shallowMount(WtIcon, {
			props: {
				icon: 'bucket',
				disabled: true,
			},
		});
		expect(wrapper.classes()).toContain('wt-icon--disabled');
	});

	it('falls back to the raw icon name when not found in the repository', () => {
		const wrapper = shallowMount(WtIcon, {
			props: {
				icon: 'totally-unknown-icon',
			},
		});
		expect(wrapper.vm.iconSvg).toBe('totally-unknown-icon');
	});

	it('emits click when clicked', async () => {
		const wrapper = shallowMount(WtIcon, {
			props: {
				icon: 'bucket',
			},
		});
		await wrapper.trigger('click');
		expect(wrapper.emitted().click).toBeTruthy();
	});
});
