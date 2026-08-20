import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import enumFilterMixin from '../enumFilterMixin.js';

const options = [
	{
		name: 'Inbound',
		value: 'inbound',
	},
	{
		name: 'Outbound',
		value: 'outbound',
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'jest',
		},
	],
});

describe('Enum filter mixin', () => {
	const setValue = vi.fn();
	const Component = {
		render() {},
		mixins: [
			enumFilterMixin,
		],
		data: () => ({
			filterQuery: 'direction',
			storedProp: 'value',
			options,
		}),
		methods: {
			setValue,
		},
	};

	beforeEach(async () => {
		setValue.mockClear();
		await router.replace({
			query: null,
		});
	});

	it('Correctly sets value from $route query', async () => {
		await router.replace({
			query: {
				direction: options[0].value,
			},
		});
		const wrapper = shallowMount(Component, {
			global: {
				plugins: [
					router,
				],
			},
		});
		await wrapper.vm.$nextTick();
		expect(setValue).toHaveBeenCalledWith({
			filter: 'direction',
			value: options[0],
		});
	});

	it('Sets empty array value if $route query is empty', async () => {
		shallowMount(Component, {
			global: {
				plugins: [
					router,
				],
			},
		});
		expect(setValue).not.toHaveBeenCalled();
	});

	it('Attaches locales to options, if they have "locale" key', async () => {
		const options = [
			{
				locale: 'vi.locale',
			},
		];
		const expectedOptions = [
			{
				locale: options[0].locale,
				name: options[0].locale,
			},
		];
		const wrapper = shallowMount(Component, {
			global: {
				plugins: [
					router,
				],
			},
			data: () => ({
				options,
			}),
		});
		expect(wrapper.vm.localizedOptions).toEqual(expectedOptions);
	});

	it('Normalizes a snake_case scalar locale and translates using the normalized key', async () => {
		const options = [
			{
				locale: 'vi.snake_case_locale',
			},
		];
		const expectedOptions = [
			{
				locale: 'vi.snakeCaseLocale',
				name: 'vi.snakeCaseLocale',
			},
		];
		const wrapper = shallowMount(Component, {
			global: {
				plugins: [
					router,
				],
			},
			data: () => ({
				options,
			}),
		});
		expect(wrapper.vm.localizedOptions).toEqual(expectedOptions);
	});

	it('Normalizes only the key element of an array locale, preserving the rest of the translation arguments, and translates using the normalized key', async () => {
		const options = [
			{
				locale: [
					'vi.snake_case_locale',
					{
						count: 5,
					},
				],
			},
		];
		const expectedOptions = [
			{
				locale: [
					'vi.snakeCaseLocale',
					{
						count: 5,
					},
				],
				name: 'vi.snakeCaseLocale',
			},
		];
		const wrapper = shallowMount(Component, {
			global: {
				plugins: [
					router,
				],
			},
			data: () => ({
				options,
			}),
		});
		expect(wrapper.vm.localizedOptions).toEqual(expectedOptions);
	});
});
