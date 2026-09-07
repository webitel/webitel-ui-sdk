import { mount, shallowMount } from '@vue/test-utils';

import WtExpansionCard from '../wt-expansion-card.vue';

describe('WtExpansionCard', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtExpansionCard);
		expect(wrapper.isVisible()).toBe(true);
	});

	it('renders header, body and actions slots', () => {
		const wrapper = mount(WtExpansionCard, {
			slots: {
				header: 'Header content',
				body: 'Body content',
				actions: 'Actions content',
			},
		});
		expect(wrapper.find('.wt-expansion-card-header').text()).toBe(
			'Header content',
		);
		expect(wrapper.find('.wt-expansion-card-body').text()).toBe('Body content');
		expect(wrapper.text()).toContain('Actions content');
	});

	it('is open by default and toggles closed when the footer is clicked', async () => {
		const wrapper = mount(WtExpansionCard, {
			slots: {
				body: 'Body content',
			},
		});
		expect(
			wrapper.find('.wt-expansion-card-body').element.parentElement.style
				.display,
		).not.toBe('none');

		await wrapper.find('.wt-expansion-card-actions').trigger('click');
		expect(wrapper.emitted().closed).toBeTruthy();

		await wrapper.find('.wt-expansion-card-actions').trigger('click');
		expect(wrapper.emitted().opened).toBeTruthy();
	});

	it('starts collapsed when the collapsed prop is true', () => {
		const wrapper = shallowMount(WtExpansionCard, {
			props: {
				collapsed: true,
			},
		});
		expect(wrapper.find('.wt-expansion-card-arrow').classes()).not.toContain(
			'wt-expansion-card-arrow--opened',
		);
	});

	it('applies the size modifier class', () => {
		const wrapper = shallowMount(WtExpansionCard, {
			props: {
				size: 'sm',
			},
		});
		expect(wrapper.classes()).toContain('wt-expansion-card--sm');
	});
});
