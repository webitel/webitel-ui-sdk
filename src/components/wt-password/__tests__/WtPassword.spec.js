import { mount, shallowMount } from '@vue/test-utils';

import WtPassword from '../wt-password.vue';

describe('WtPassword', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtPassword);
		expect(wrapper.classes()).toContain('wt-password');
	});

	it('does not render a label when no label prop or slot is passed', () => {
		const wrapper = shallowMount(WtPassword);
		expect(
			wrapper
				.findComponent({
					name: 'wt-label',
				})
				.exists(),
		).toBe(false);
	});

	it('renders the label text when passed', () => {
		const wrapper = mount(WtPassword, {
			props: {
				label: 'Password',
			},
		});
		expect(wrapper.find('.wt-label').text()).toBe('Password');
	});

	it('renders a mask toggle button by default', () => {
		const wrapper = mount(WtPassword);
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.exists(),
		).toBe(true);
	});

	it('does not render a mask toggle button when toggleMask is false', () => {
		const wrapper = mount(WtPassword, {
			props: {
				toggleMask: false,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.exists(),
		).toBe(false);
	});

	it('toggles the input type and icon when the mask toggle is clicked', async () => {
		const wrapper = mount(WtPassword);
		const toggleBtn = wrapper.findComponent({
			name: 'wt-icon-btn',
		});
		expect(toggleBtn.attributes('icon')).toBe('eye--opened');
		expect(
			wrapper
				.findComponent({
					name: 'Password',
				})
				.props('inputProps'),
		).toEqual({
			type: 'password',
		});

		await toggleBtn.trigger('click');

		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.attributes('icon'),
		).toBe('eye--closed');
		expect(
			wrapper
				.findComponent({
					name: 'Password',
				})
				.props('inputProps'),
		).toEqual({
			type: 'text',
		});
	});

	it('passes disabled down to the underlying password input', () => {
		const wrapper = mount(WtPassword, {
			props: {
				disabled: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'Password',
				})
				.props('disabled'),
		).toBe(true);
	});
});
