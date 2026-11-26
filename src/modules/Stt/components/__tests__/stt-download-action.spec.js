import { shallowMount } from '@vue/test-utils';

import SttDownloadAction from '../stt-download-action.vue';

describe('SttDownloadAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(SttDownloadAction);
		expect(wrapper.isVisible()).toBe(true);
	});
});
