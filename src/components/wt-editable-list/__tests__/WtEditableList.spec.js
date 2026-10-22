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
		],
		template: `<div class="table">
			<div v-for="(item, index) of data" :key="index" class="row">
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
});
