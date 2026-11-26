import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import WtCollapsibleSearchBar from '../wt-collapsible-search-bar.vue';

const TOGGLE = '.wt-collapsible-search-bar__toggle';
const EXPANDED = 'wt-collapsible-search-bar--expanded';

/* a parent that keeps `value` in sync with `input`, as v-model does */
const mountControlled = (props = {}) => {
	const wrapper = mount(WtCollapsibleSearchBar, {
		props: {
			value: '',
			onInput: (value) =>
				wrapper.setProps({
					value,
				}),
			...props,
		},
		attachTo: document.body,
	});
	return wrapper;
};

const flush = async () => {
	await nextTick();
	await nextTick();
};

describe('WtCollapsibleSearchBar', () => {
	let wrapper;

	afterEach(() => {
		wrapper?.unmount();
		vi.useRealTimers();
	});

	it('is collapsed to the magnifier button while empty', () => {
		wrapper = mountControlled();
		expect(wrapper.classes()).not.toContain(EXPANDED);
		expect(wrapper.find(TOGGLE).exists()).toBe(true);
		expect(wrapper.find(TOGGLE).attributes('aria-expanded')).toBe('false');
	});

	it('labels the magnifier button with the placeholder', () => {
		wrapper = mountControlled({
			placeholder: 'Search by number',
		});
		expect(wrapper.find(TOGGLE).attributes('aria-label')).toBe(
			'Search by number',
		);
	});

	it('is expanded at once when it starts with a search', () => {
		wrapper = mountControlled({
			value: 'abc',
		});
		expect(wrapper.classes()).toContain(EXPANDED);
		expect(wrapper.find(TOGGLE).attributes('aria-expanded')).toBe('true');
		expect(wrapper.find(TOGGLE).element.inert).toBe(true);
	});

	it('uses the filled close icon for the reset button', () => {
		wrapper = mountControlled({
			value: 'abc',
		});
		expect(
			wrapper
				.findComponent({
					name: 'WtSearchBar',
				})
				.props('resetIcon'),
		).toBe('close--filled');
	});

	it('expands and focuses the input on the magnifier click', async () => {
		wrapper = mountControlled();
		await wrapper.find(TOGGLE).trigger('click');
		await flush();

		expect(wrapper.classes()).toContain(EXPANDED);
		expect(document.activeElement).toBe(wrapper.find('input').element);
	});

	it('collapses on blur when empty', async () => {
		wrapper = mountControlled();
		await wrapper.find(TOGGLE).trigger('click');
		await flush();

		await wrapper.trigger('focusout', {
			relatedTarget: null,
		});
		expect(wrapper.classes()).not.toContain(EXPANDED);
	});

	it('stays expanded on blur with a search', async () => {
		wrapper = mountControlled();
		await wrapper.find(TOGGLE).trigger('click');
		await flush();
		await wrapper.setProps({
			value: 'abc',
		});

		await wrapper.trigger('focusout', {
			relatedTarget: null,
		});
		expect(wrapper.classes()).toContain(EXPANDED);
	});

	it('does not collapse when the focus moves inside it', async () => {
		wrapper = mountControlled();
		await wrapper.find(TOGGLE).trigger('click');
		await flush();

		const inner = wrapper.find('input').element;
		await wrapper.trigger('focusout', {
			relatedTarget: inner,
		});
		expect(wrapper.classes()).toContain(EXPANDED);
	});

	it('clears a blank search and collapses on blur', async () => {
		wrapper = mountControlled();
		await wrapper.find(TOGGLE).trigger('click');
		await flush();
		await wrapper.setProps({
			value: '   ',
		});

		await wrapper.trigger('focusout', {
			relatedTarget: null,
		});
		await flush();

		expect(wrapper.emitted().input.at(-1)).toEqual([
			'',
		]);
		expect(wrapper.classes()).not.toContain(EXPANDED);
	});

	it('clears, collapses and focuses the magnifier on Escape', async () => {
		wrapper = mountControlled({
			value: 'abc',
		});
		await wrapper.find('input').trigger('keydown', {
			key: 'Escape',
		});
		await flush();

		expect(wrapper.emitted().input.at(-1)).toEqual([
			'',
		]);
		expect(wrapper.classes()).not.toContain(EXPANDED);
		expect(document.activeElement).toBe(wrapper.find(TOGGLE).element);
	});

	it('clears, collapses and focuses the magnifier on the reset button', async () => {
		wrapper = mountControlled({
			value: 'abc',
		});
		await wrapper.find('.wt-search-bar__reset-icon-btn').trigger('click');
		await flush();

		expect(wrapper.emitted().input.at(-1)).toEqual([
			'',
		]);
		expect(wrapper.classes()).not.toContain(EXPANDED);
		expect(document.activeElement).toBe(wrapper.find(TOGGLE).element);
	});

	it('stays expanded while focused after the text is erased by hand', async () => {
		wrapper = mountControlled();
		await wrapper.find(TOGGLE).trigger('click');
		await flush();
		await wrapper.setProps({
			value: 'a',
		});
		await wrapper.setProps({
			value: '',
		});

		expect(wrapper.classes()).toContain(EXPANDED);
	});

	it('does not emit a stale debounced search after Escape', async () => {
		vi.useFakeTimers();
		wrapper = mountControlled();
		await wrapper.find(TOGGLE).trigger('click');
		await flush();

		const input = wrapper.find('input');
		await input.setValue('abc');
		await input.trigger('keydown', {
			key: 'Escape',
		});
		vi.advanceTimersByTime(1000);

		expect(wrapper.emitted().search).toEqual([
			[
				'',
			],
		]);
	});
});
