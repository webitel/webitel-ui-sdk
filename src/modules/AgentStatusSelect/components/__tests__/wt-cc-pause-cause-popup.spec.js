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

	it('emits payload and close on setPause', async () => {
		const wrapper = mount(WtCcPauseCausePopup, {
			props: {
				options: [
					{
						id: 1,
						name: 'coffee',
					},
				],
			},
		});

		wrapper.vm.select({
			id: 1,
			name: 'coffee',
			statusComment: 'brb',
		});
		wrapper.vm.setPause();
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted().change[0][0]).toEqual({
			pauseCause: 'coffee',
			statusComment: 'brb',
		});
		expect(wrapper.emitted().close).toBeTruthy();
	});
});
