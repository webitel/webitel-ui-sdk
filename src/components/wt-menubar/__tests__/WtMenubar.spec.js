import { mount } from '@vue/test-utils';

import WtMenubar from '../wt-menubar.vue';

describe('WtMenubar', () => {
	it('renders a component', () => {
		const wrapper = mount(WtMenubar);
		expect(wrapper.classes()).toContain('wt-menubar');
	});

	it('forwards named slots through to PMenubar, excluding default', () => {
		const wrapper = mount(WtMenubar, {
			slots: {
				start: 'Start content',
				end: 'End content',
			},
		});
		expect(wrapper.text()).toContain('Start content');
		expect(wrapper.text()).toContain('End content');
	});

	it('does not render default slot content', () => {
		const wrapper = mount(WtMenubar, {
			slots: {
				default: 'Default content',
			},
		});
		expect(wrapper.text()).not.toContain('Default content');
	});
});
