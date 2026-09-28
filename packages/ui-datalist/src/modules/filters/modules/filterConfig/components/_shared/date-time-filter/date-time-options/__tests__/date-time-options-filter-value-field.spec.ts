import { shallowMount } from '@vue/test-utils';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';
import { describe, expect, it } from 'vitest';

import DateTimeOptionsFilterValueField from '../date-time-options-filter-value-field.vue';

const mountField = (props: Record<string, unknown> = {}) =>
	shallowMount(DateTimeOptionsFilterValueField, {
		props,
	});

describe('DateTimeOptionsFilterValueField default value', () => {
	it('preselects today when it is the only value source', () => {
		const wrapper = mountField();

		expect(wrapper.emitted('update:modelValue')).toEqual([
			[
				RelativeDatetimeValue.Today,
			],
		]);
	});

	/*
	the static panel lists every configured filter, so a field seeding itself
	would apply a filter the user never set
	 */
	it('seeds nothing when disableDefaultValue is set', () => {
		const wrapper = mountField({
			disableDefaultValue: true,
		});

		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
	});

	it('leaves an existing value alone', () => {
		const wrapper = mountField({
			disableDefaultValue: true,
			modelValue: RelativeDatetimeValue.ThisWeek,
		});

		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
	});
});
