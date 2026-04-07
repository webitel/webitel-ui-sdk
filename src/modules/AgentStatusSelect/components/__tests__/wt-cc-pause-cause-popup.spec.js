import { mount, shallowMount } from '@vue/test-utils';

import WtCcPauseCausePopup from '../_internals/wt-cc-pause-cause-popup.vue';

describe('Pause cause popup', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtCcPauseCausePopup);
		expect(wrapper.exists()).toBe(true);
	});
	it('at option input event, sets "selected" its value', () => {
		const value = 'jest';
		const wrapper = mount(WtCcPauseCausePopup, {
			props: {
				options: [
					{
						id: 1,
						name: value,
					},
				],
			},
		});
		wrapper
			.findComponent({
				name: 'wt-radio',
			})
			.vm.$emit('update:selected');
		expect(wrapper.vm.selected.name).toEqual(value);
	});
});
