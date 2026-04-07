import { shallowMount } from '@vue/test-utils';
import { ref } from 'vue';

import { useValidation } from '../../../mixins/validationMixin/useValidation';
import DeleteConfirmationPopup from '../components/delete-confirmation-popup.vue';

vi.mock('../../../mixins/validationMixin/useValidation.js');

useValidation.mockImplementation(() => ({
	isValidation: ref(false),
	invalid: ref(false),
	validationText: ref(''),
}));

describe('DeleteConfirmationPopup', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(DeleteConfirmationPopup, {
			props: {
				deleteCount: 1,
				callback: vi.fn(),
			},
		});
		expect(wrapper.classes('delete-confirmation-popup')).toBe(true);
	});

	it('popup message block have delete count', () => {
		const deleteCount = 123;
		const wrapper = shallowMount(DeleteConfirmationPopup, {
			props: {
				deleteCount,
				callback: vi.fn(),
			},
		});
		expect(wrapper.vm.deleteMessage).toContain(deleteCount.toString());
	});

	it('uses "delete all" text for zero count', () => {
		const wrapper = shallowMount(DeleteConfirmationPopup, {
			props: {
				deleteCount: 0,
				callback: vi.fn(),
			},
		});

		expect(wrapper.vm.deleteMessage).toBeTruthy();
	});
});
