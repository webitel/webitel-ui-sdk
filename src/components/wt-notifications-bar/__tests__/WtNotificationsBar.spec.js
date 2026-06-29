import { shallowMount } from '@vue/test-utils';
import { useToast } from 'primevue/usetoast';

import eventBus from '../../../scripts/eventBus.js';
import { TypeToSeverityMap } from '../../wt-toast/types';
import WtToast from '../../wt-toast/wt-toast.vue';
import WtNotificationsBar from '../wt-notifications-bar.vue';

vi.mock('primevue/usetoast');

describe('WtNotificationsBar', () => {
	let toastAdd;

	beforeEach(() => {
		toastAdd = vi.fn();
		useToast.mockReturnValue({
			add: toastAdd,
		});
	});

	function mountComponent() {
		return shallowMount(WtNotificationsBar, {
			global: {
				provide: {
					$eventBus: eventBus,
				},
			},
		});
	}

	it('renders WtToast with position top-right', () => {
		const wrapper = mountComponent();
		const wtToast = wrapper.findComponent(WtToast);
		expect(wtToast.exists()).toBe(true);
		expect(wtToast.attributes('position')).toBe('top-right');
		wrapper.unmount();
	});

	it('calls toast.add with mapped severity and detail on notification event', () => {
		const wrapper = mountComponent();
		eventBus.$emit('notification', {
			type: 'error',
			text: 'Something went wrong',
		});
		expect(toastAdd).toHaveBeenCalledWith({
			severity: TypeToSeverityMap.error,
			detail: 'Something went wrong',
			life: 4000,
		});
		wrapper.unmount();
	});

	it('converts timeout from seconds to milliseconds as toast life', () => {
		const wrapper = mountComponent();
		eventBus.$emit('notification', {
			type: 'success',
			text: 'Done',
			timeout: 10,
		});
		expect(toastAdd).toHaveBeenCalledWith({
			severity: TypeToSeverityMap.success,
			detail: 'Done',
			life: 10000,
		});
		wrapper.unmount();
	});

	it('unregisters event bus listener on unmount', () => {
		const offSpy = vi.spyOn(eventBus, '$off');
		const wrapper = mountComponent();
		wrapper.unmount();
		expect(offSpy).toHaveBeenCalledWith('notification', expect.any(Function));
		offSpy.mockRestore();
	});
});
