import { shallowMount } from '@vue/test-utils';

import AgentStatus from '../../../enums/AgentStatus/AgentStatus.enum.js';
import WtSingleSelect from '../../wt-single-select/wt-single-select.vue';
import WtStatusSelect from '../wt-status-select.vue';

describe('WtStatusSelect', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtStatusSelect, {
			stubs: {
				WtSingleSelect,
			},
		});
		expect(wrapper.classes('wt-status-select')).toBe(true);
	});

	it('keeps "online" option in the list when it is the current status', () => {
		const wrapper = shallowMount(WtStatusSelect, {
			props: {
				status: AgentStatus.ONLINE,
			},
			stubs: {
				WtSingleSelect,
			},
		});
		expect(
			wrapper.vm.availableOptions.some(
				(opt) => opt.value === AgentStatus.ONLINE,
			),
		).toBe(true);
	});

	it('keeps "pause" option in the list when it is the current status', () => {
		const wrapper = shallowMount(WtStatusSelect, {
			props: {
				status: AgentStatus.PAUSE,
			},
			stubs: {
				WtSingleSelect,
			},
		});
		expect(
			wrapper.vm.availableOptions.some(
				(opt) => opt.value === AgentStatus.PAUSE,
			),
		).toBe(true);
	});

	it('removes "offline" option from the list when it is the current status', () => {
		const wrapper = shallowMount(WtStatusSelect, {
			props: {
				status: AgentStatus.OFFLINE,
			},
			stubs: {
				WtSingleSelect,
			},
		});
		expect(
			wrapper.vm.availableOptions.some(
				(opt) => opt.value === AgentStatus.OFFLINE,
			),
		).toBe(false);
	});

	it('always removes "break_out" option from the list', () => {
		const wrapper = shallowMount(WtStatusSelect, {
			props: {
				status: AgentStatus.BREAK_OUT,
			},
			stubs: {
				WtSingleSelect,
			},
		});
		expect(
			wrapper.vm.availableOptions.some(
				(opt) => opt.value === AgentStatus.BREAK_OUT,
			),
		).toBe(false);
	});

	it('correctly represents duration', () => {
		const wrapper = shallowMount(WtStatusSelect, {
			stubs: {
				WtSingleSelect,
			},
		});
		expect(wrapper.vm.duration).toBe('00:00:00');

		// wrapper.setProps({ statusDuration: 1 });
		// expect(wrapper.vm.duration).toBe('00:00:01');
		//
		// wrapper.setProps({ statusDuration: '01' });
		// expect(wrapper.vm.duration).toBe('00:00:01');
	});
});
