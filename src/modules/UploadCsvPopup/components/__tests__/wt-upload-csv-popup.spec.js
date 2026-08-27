import { shallowMount } from '@vue/test-utils';

import WtUploadCsvPopup from '../wt-upload-csv-popup.vue';

describe('WtUploadCsvPopup', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtUploadCsvPopup, {
			props: {
				file: null,
				mappingFields: [],
			},
		});

		expect(wrapper).toBeTruthy();
	});

	/*
	An undeclared prop silently falls through as an attribute, so the composable
	would never see the saver and the import would close as a success without
	saving anything. Props extends UseUploadCsvProps to prevent that — this
	guards the contract.
	 */
	it.each([
		'file',
		'mappingFields',
		'addBulkItems',
		'handlingMode',
		'fileUploadHandler',
	])('declares the %s prop', (prop) => {
		expect(Object.keys(WtUploadCsvPopup.props)).toContain(prop);
	});
});
