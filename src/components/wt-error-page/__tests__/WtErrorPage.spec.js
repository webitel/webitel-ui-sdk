import { shallowMount } from '@vue/test-utils';

import ErrorPage from '../wt-error-page.vue';

describe('Error Page', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(ErrorPage, {
			props: {
				type: '',
			},
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('renders 404-specific title, text and image alt', () => {
		const wrapper = shallowMount(ErrorPage, {
			props: {
				type: '404',
			},
		});
		expect(wrapper.find('.wt-error-page__title').text()).toBe(
			"Looks like you're lost",
		);
		expect(wrapper.find('.wt-error-page__text').text().length).toBeGreaterThan(
			0,
		);
		expect(wrapper.find('.wt-error-page__img').attributes('alt')).toBe(
			'Not found pic',
		);
	});

	it('renders 403-specific title, text and image alt', () => {
		const wrapper = shallowMount(ErrorPage, {
			props: {
				type: '403',
			},
		});
		expect(wrapper.find('.wt-error-page__title').text()).toBe('Access denied');
		expect(wrapper.find('.wt-error-page__text').text().length).toBeGreaterThan(
			0,
		);
		expect(wrapper.find('.wt-error-page__img').attributes('alt')).toBe(
			'Forbidden pic',
		);
	});

	it('emits back when the action button is clicked', async () => {
		const wrapper = shallowMount(ErrorPage, {
			props: {
				type: '404',
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-button',
			})
			.vm.$emit('click');
		expect(wrapper.emitted().back).toBeTruthy();
	});
});
