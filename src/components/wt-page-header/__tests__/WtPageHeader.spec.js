import { mount, shallowMount } from '@vue/test-utils';

import WtPageHeader from '../wt-page-header.vue';

describe('WtPageHeader', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtPageHeader);
		expect(wrapper.isVisible()).toBe(true);
	});

	it('renders default slot content in the title wrapper', () => {
		const wrapper = mount(WtPageHeader, {
			slots: {
				default: 'Header content',
			},
		});
		expect(wrapper.text()).toContain('Header content');
	});

	it('renders title slot content', () => {
		const wrapper = mount(WtPageHeader, {
			slots: {
				title: 'Page title',
			},
		});
		expect(wrapper.text()).toContain('Page title');
	});

	it('renders a default primary button labeled "Add" that emits primaryAction on click', async () => {
		const primaryAction = vi.fn();
		const wrapper = mount(WtPageHeader, {
			props: {
				primaryAction,
			},
		});
		const [primaryButton] = wrapper.findAllComponents({
			name: 'wt-button',
		});
		expect(primaryButton.text()).toBe('Add');

		await primaryButton.trigger('click');
		expect(primaryAction).toHaveBeenCalled();
	});

	it('uses custom primaryText and disables the primary button', () => {
		const wrapper = mount(WtPageHeader, {
			props: {
				primaryText: 'Create',
				primaryDisabled: true,
			},
		});
		const [primaryButton] = wrapper.findAllComponents({
			name: 'wt-button',
		});
		expect(primaryButton.text()).toBe('Create');
		expect(primaryButton.attributes('disabled')).toBeDefined();
	});

	it('hides the primary button when hidePrimary is true', () => {
		const wrapper = mount(WtPageHeader, {
			props: {
				hidePrimary: true,
			},
		});
		expect(
			wrapper.findAllComponents({
				name: 'wt-button',
			}).length,
		).toBe(0);
	});

	it('does not render a secondary button by default', () => {
		const wrapper = mount(WtPageHeader);
		expect(
			wrapper.findAllComponents({
				name: 'wt-button',
			}).length,
		).toBe(1);
	});

	it('renders a secondary button when secondaryText or secondaryAction is provided', async () => {
		const secondaryAction = vi.fn();
		const wrapper = mount(WtPageHeader, {
			props: {
				secondaryAction,
			},
		});
		const buttons = wrapper.findAllComponents({
			name: 'wt-button',
		});
		expect(buttons.length).toBe(2);
		expect(buttons[1].text()).toBe('Close');

		await buttons[1].trigger('click');
		expect(secondaryAction).toHaveBeenCalled();
	});

	it('hides the secondary button when hideSecondary is true even with secondaryText set', () => {
		const wrapper = mount(WtPageHeader, {
			props: {
				hideSecondary: true,
				secondaryText: 'Cancel',
			},
		});
		expect(
			wrapper.findAllComponents({
				name: 'wt-button',
			}).length,
		).toBe(1);
	});
});
