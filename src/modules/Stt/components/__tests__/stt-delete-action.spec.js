import { shallowMount } from '@vue/test-utils';

import SttDeleteAction from '../stt-delete-action.vue';

describe('SttDeleteAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(SttDeleteAction);
		expect(wrapper.isVisible()).toBe(true);
	});
});
