import { mount, shallowMount } from '@vue/test-utils';

import { MessageColor, MessageVariant } from '../../../enums';
import WtMessage from '../wt-message.vue';

describe('WtMessage', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtMessage);
		expect(
			wrapper
				.findComponent({
					name: 'Message',
				})
				.exists(),
		).toBe(true);
	});

	it('applies default color, variant and size', () => {
		const wrapper = shallowMount(WtMessage);
		expect(wrapper.attributes('severity')).toBe(MessageColor.SECONDARY);
		expect(wrapper.attributes('variant')).toBe(MessageVariant.FILLED);
		expect(wrapper.attributes('size')).toBe('normal');
	});

	it('maps custom color, variant and size props', () => {
		const wrapper = shallowMount(WtMessage, {
			props: {
				color: MessageColor.ERROR,
				variant: MessageVariant.SIMPLE,
				size: 'sm',
			},
		});
		expect(wrapper.attributes('severity')).toBe(MessageColor.ERROR);
		expect(wrapper.attributes('variant')).toBe(MessageVariant.SIMPLE);
		expect(wrapper.attributes('size')).toBe('small');
	});

	it('renders default slot content', () => {
		const wrapper = mount(WtMessage, {
			slots: {
				default: 'Something happened',
			},
		});
		expect(wrapper.text()).toContain('Something happened');
	});
});
