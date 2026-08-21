import { mount, shallowMount } from '@vue/test-utils';

import WtChip from '../wt-chip.vue';

describe('WtChip', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtChip);
		expect(wrapper.classes('wt-chip')).toBe(true);
	});

	it('renders a chip content via default slot', () => {
		const content = 'chip content';
		const wrapper = mount(WtChip, {
			slots: {
				default: content,
			},
		});
		expect(wrapper.text()).toContain(content);
	});

	it('applies the default main color class', () => {
		const wrapper = shallowMount(WtChip);
		expect(wrapper.classes()).toContain('p-chip-main');
	});

	it('applies a custom color class', () => {
		const wrapper = shallowMount(WtChip, {
			props: {
				color: 'danger',
			},
		});
		expect(wrapper.classes()).toContain('p-chip-danger');
	});

	it('does not render a remove button by default', () => {
		const wrapper = mount(WtChip);
		expect(wrapper.find('.wt-chip__close-icon').exists()).toBe(false);
	});

	it('renders a remove button and emits remove when removable', async () => {
		const wrapper = mount(WtChip, {
			props: {
				removable: true,
			},
		});
		const closeIcon = wrapper.find('.wt-chip__close-icon');
		expect(closeIcon.exists()).toBe(true);

		await closeIcon.trigger('click');
		expect(wrapper.emitted().remove).toBeTruthy();
	});
});
