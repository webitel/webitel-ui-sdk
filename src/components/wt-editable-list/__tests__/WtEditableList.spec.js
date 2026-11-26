import { mount } from '@vue/test-utils';

import WtEditableList from '../wt-editable-list.vue';

const headers = [
	{
		value: 'key',
		text: 'Key',
	},
];

const createRow = () => ({
	key: '',
});

/* [Claude] the table pieces are stubbed: the test is about the rows, not their rendering */
const stubs = {
	'wt-action-bar': {
		emits: [
			'click:add',
		],
		template: '<button class="add" @click="$emit(\'click:add\')" />',
	},
	'wt-empty': {
		template: '<div class="empty" />',
	},
	'wt-table': {
		props: [
			'data',
			'headers',
		],
		emits: [
			'sort',
		],
		template: `<div class="table">
			<div v-for="(item, index) of data" :key="index" class="row">
				<span class="shown">{{ item.key }}</span>
				<slot name="key" :item="item" :index="index" />
				<slot name="actions" :item="item" :index="index" />
			</div>
		</div>`,
	},
	'wt-icon-action': {
		emits: [
			'click',
		],
		template: '<button class="delete" @click="$emit(\'click\')" />',
	},
};

const mountTable = (props = {}, slots = {}) =>
	mount(WtEditableList, {
		props: {
			headers,
			createRow,
			...props,
		},
		slots,
		global: {
			stubs,
		},
	});

describe('WtEditableList', () => {
	it('renders a component', () => {
		expect(mountTable().classes('wt-editable-list')).toBe(true);
	});

	it('appends a new row on add, even to a model without rows', async () => {
		const wrapper = mountTable({
			modelValue: undefined,
		});
		await wrapper.find('.add').trigger('click');
		expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([
			{
				key: '',
			},
		]);
	});

	it('removes the clicked row on delete', async () => {
		const wrapper = mountTable({
			modelValue: [
				{
					key: 'a',
				},
				{
					key: 'b',
				},
			],
		});
		await wrapper.findAll('.delete')[0].trigger('click');
		expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([
			{
				key: 'b',
			},
		]);
		expect(wrapper.emitted('delete')[0]).toEqual([
			{
				key: 'a',
			},
			0,
		]);
	});

	it('passes each row to the cell slot named after its header', () => {
		const wrapper = mountTable(
			{
				modelValue: [
					{
						key: 'a',
					},
				],
			},
			{
				key: '<template #key="{ item }"><span class="cell">{{ item.key }}</span></template>',
			},
		);
		expect(wrapper.find('.cell').text()).toBe('a');
	});

	/* [Claude] WFM-241: rows kept in the card sort on screen, the model keeps its order */
	describe('sortable', () => {
		const sortableHeaders = [
			{
				value: 'key',
				text: 'Key',
				sortBy: (row) => row.key,
			},
		];
		const modelValue = [
			{
				key: 'b',
			},
			{
				key: 'c',
			},
			{
				key: 'a',
			},
		];
		const mountSorted = (order, slots = {}) => {
			const wrapper = mountTable(
				{
					modelValue,
					headers: sortableHeaders,
					sortable: true,
				},
				slots,
			);
			wrapper.findComponent(stubs['wt-table']).vm.$emit(
				'sort',
				{
					field: 'key',
				},
				order,
			);
			return wrapper;
		};
		const shown = (wrapper) =>
			wrapper.findAll('.shown').map((cell) => cell.text());

		it('marks the headers with `sortBy` as sortable for the table', () => {
			const wrapper = mountTable({
				headers: sortableHeaders,
				sortable: true,
			});
			expect(wrapper.findComponent(stubs['wt-table']).props('headers')).toEqual(
				[
					{
						value: 'key',
						text: 'Key',
						field: 'key',
						sort: null,
					},
				],
			);
		});

		it('sorts the shown rows by the order the table asks for', async () => {
			const wrapper = mountSorted('asc');
			await wrapper.vm.$nextTick();
			expect(shown(wrapper)).toEqual([
				'a',
				'b',
				'c',
			]);
			wrapper.findComponent(stubs['wt-table']).vm.$emit(
				'sort',
				{
					field: 'key',
				},
				'desc',
			);
			await wrapper.vm.$nextTick();
			expect(shown(wrapper)).toEqual([
				'c',
				'b',
				'a',
			]);
			expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		});

		it('gives slots and delete the row index in the model', async () => {
			const wrapper = mountSorted('asc', {
				key: '<template #key="{ index }"><span class="index">{{ index }}</span></template>',
			});
			await wrapper.vm.$nextTick();
			expect(wrapper.findAll('.index').map((cell) => cell.text())).toEqual([
				'2',
				'0',
				'1',
			]);
			await wrapper.findAll('.delete')[0].trigger('click');
			expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([
				{
					key: 'b',
				},
				{
					key: 'c',
				},
			]);
		});
	});
});
