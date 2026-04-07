import { shallowMount } from '@vue/test-utils';

import AuditFormQuestionScore from '../audit-form-question-score.vue';

describe('AuditFormQuestionScore', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(AuditFormQuestionScore, {
			props: {
				question: {
					min: 0,
					max: 10,
				},
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
	it('emits result change with selected radio score', () => {
		const min = 8;
		const wrapper = shallowMount(AuditFormQuestionScore, {
			props: {
				question: {
					min,
					max: 10,
				},
				mode: 'read',
			},
		});
		wrapper
			.findComponent({
				name: 'wt-radio',
			})
			.vm.$emit('update:selected', min);
		expect(wrapper.emitted()['update:answer'][0][0]).toEqual({
			score: min,
		});
	});
});
