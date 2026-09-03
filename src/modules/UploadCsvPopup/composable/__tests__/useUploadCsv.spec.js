import { shallowMount } from '@vue/test-utils';
import { ref } from 'vue';

import HandlingCSVMode from '../../types/WtUploadCSVHandlingMode.enum';
import useUploadCsv from '../useUploadCsv';

const Component = {
	props: {
		file: {
			default: null,
		},
		mappingFields: {
			type: Array,
			default: () => [],
		},
		addBulkItems: {
			type: Function,
			default: undefined,
		},
		handlingMode: {
			type: String,
			default: HandlingCSVMode.PROCESS,
		},
		fileUploadHandler: {
			type: Function,
			default: undefined,
		},
	},
	emits: [
		'changeMappingFields',
		'save',
		'close',
	],
	setup(props, { emit }) {
		const skipHeaders = ref(true);
		const separator = ref(',');

		return {
			skipHeaders,
			separator,
			...useUploadCsv({
				props,
				emit,
				skipHeaders,
				separator,
			}),
		};
	},
	render: () => null,
};

const makeFile = (content) => {
	const blob = new Blob(
		[
			content,
		],
		{
			type: 'text/csv',
		},
	);

	return new File(
		[
			blob,
		],
		'test.csv',
		{
			type: 'text/csv',
		},
	);
};

// the composable reads the file through a watcher, so give FileReader a tick
const mountWithFile = async (csv, props = {}) => {
	const wrapper = shallowMount(Component, {
		props,
	});

	await wrapper.setProps({
		file: makeFile(csv),
	});

	await new Promise((resolve) => {
		setTimeout(resolve, 100);
	});

	return wrapper;
};

describe('useUploadCsv', () => {
	it('mounts a component with the composable', () => {
		const wrapper = shallowMount(Component, {
			props: {
				file: {},
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	it('parses and saves simple csv', async () => {
		const csv = `
      col1,col2
      John,30
      Jane,25
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

		const saveCallback = vi.fn();

		const wrapper = await mountWithFile(csv, {
			addBulkItems: saveCallback,
			mappingFields: [
				{
					name: 'name',
					csv: 'col1',
				},
				{
					name: 'age',
					csv: 'col2',
				},
			],
		});

		await wrapper.vm.processCSV();

		expect(saveCallback).toHaveBeenCalledWith([
			{
				name: 'John',
				age: '30',
			},
			{
				name: 'Jane',
				age: '25',
			},
		]);
	});

	it('parsing of csv with empty required throws error', async () => {
		const csv = `
      col1,col2
      John,
      Jane,25
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

		const saveCallback = vi.fn();

		const wrapper = await mountWithFile(csv, {
			addBulkItems: saveCallback,
			mappingFields: [
				{
					name: 'name',
					csv: 'col1',
					required: true,
				},
				{
					name: 'age',
					csv: 'col2',
					required: true,
				},
			],
		});

		await expect(wrapper.vm.processCSV()).rejects.toBeTruthy();
		expect(saveCallback).not.toHaveBeenCalled();
	});

	it('parsing of csv with multiple columns selected to required field', async () => {
		const csv = `
      col1,col2,col3
      John,,30
      Jane,25,
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

		const saveCallback = vi.fn();

		const wrapper = await mountWithFile(csv, {
			addBulkItems: saveCallback,
			mappingFields: [
				{
					name: 'name',
					csv: 'col1',
					required: true,
				},
				{
					name: 'age',
					csv: [
						'col2',
						'col3',
					],
					required: true,
				},
			],
		});

		await wrapper.vm.processCSV();

		expect(saveCallback).toHaveBeenCalledWith([
			{
				name: 'John',
				age: [
					'',
					'30',
				],
			},
			{
				name: 'Jane',
				age: [
					'25',
					'',
				],
			},
		]);
	});

	/*
	WTEL-10058: guards the admin data that the parser never touched — queue
	member variables, blacklist descriptions, device passwords. Type casting
	lives in CRM now, so everything reaching a consumer is a string.
	 */
	it('keeps plain values as strings, so text columns are not coerced', async () => {
		const csv = `
      col1,col2
      true,"[1,2]"
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

		const saveCallback = vi.fn();

		const wrapper = await mountWithFile(csv, {
			addBulkItems: saveCallback,
			mappingFields: [
				{
					name: 'flag',
					csv: 'col1',
				},
				{
					name: 'list',
					csv: 'col2',
				},
			],
		});

		await wrapper.vm.processCSV();

		expect(saveCallback).toHaveBeenCalledWith([
			{
				flag: 'true',
				list: '[1,2]',
			},
		]);
	});

	it('uploads the whole file in the upload handling mode', async () => {
		const csv = `
      col1
      John
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

		const saveCallback = vi.fn();
		const fileUploadHandler = vi.fn();

		const wrapper = await mountWithFile(csv, {
			handlingMode: HandlingCSVMode.UPLOAD,
			addBulkItems: saveCallback,
			fileUploadHandler,
			mappingFields: [
				{
					name: 'name',
					csv: 'col1',
				},
			],
		});

		await wrapper.vm.processCSV();

		expect(fileUploadHandler).toHaveBeenCalled();
		expect(saveCallback).not.toHaveBeenCalled();
	});

	/*
	WTEL-10058: the popup owns the separator, so a consumer that ships the raw
	file to the backend has no other way to learn which one the user picked.
	 */
	it('hands the chosen separator to the file upload handler', async () => {
		const csv = 'col1;col2\nJohn;30';

		const fileUploadHandler = vi.fn();

		const wrapper = await mountWithFile(csv, {
			handlingMode: HandlingCSVMode.UPLOAD,
			fileUploadHandler,
			mappingFields: [
				{
					name: 'name',
					csv: 'col1',
				},
			],
		});

		wrapper.vm.separator = ';';
		await wrapper.vm.processCSV();

		expect(fileUploadHandler).toHaveBeenCalledWith({
			separator: ';',
		});
	});

	it('emits save and closes on a successful handleSave', async () => {
		const csv = `
      col1
      John
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

		const wrapper = await mountWithFile(csv, {
			addBulkItems: vi.fn(),
			mappingFields: [
				{
					name: 'name',
					csv: 'col1',
				},
			],
		});

		await wrapper.vm.handleSave();

		expect(wrapper.emitted('save')).toHaveLength(1);
		expect(wrapper.emitted('close')).toHaveLength(1);
	});

	it('does not close the popup when saving fails', async () => {
		const csv = `
      col1
      John
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

		const wrapper = await mountWithFile(csv, {
			addBulkItems: vi.fn(() => Promise.reject(new Error('nope'))),
			mappingFields: [
				{
					name: 'name',
					csv: 'col1',
				},
			],
		});

		await expect(wrapper.vm.processCSV()).rejects.toThrow();
		expect(wrapper.emitted('close')).toBeUndefined();
	});

	it('resets the mappings when the parse options change', async () => {
		const csv = `
      col1,col2
      John,30
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

		const wrapper = await mountWithFile(csv, {
			mappingFields: [
				{
					name: 'name',
					csv: 'col1',
				},
				{
					name: 'tags',
					csv: [
						'col2',
					],
					multiple: true,
				},
			],
		});

		wrapper.vm.separator = ';';

		// the parse options watcher is debounced by 1s
		await new Promise((resolve) => {
			setTimeout(resolve, 1200);
		});

		const emitted = wrapper.emitted('changeMappingFields');

		expect(emitted).toBeTruthy();
		expect(emitted.at(-1)[0]).toEqual([
			{
				name: 'name',
				csv: '',
			},
			{
				name: 'tags',
				csv: [],
				multiple: true,
			},
		]);
	});
});
