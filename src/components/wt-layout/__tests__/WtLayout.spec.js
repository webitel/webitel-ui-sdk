import { mount, shallowMount } from '@vue/test-utils';

import WtLayout from '../wt-layout.vue';

const mockRect = (el, width) => {
	el.getBoundingClientRect = () => ({
		width,
	});
	el.style.minWidth = '320px';
};

const mountPair = (props) => {
	const Host = {
		components: {
			WtLayout,
		},
		template: `
      <div>
        <wt-layout v-bind="layoutProps" @resize="onResize" />
        <wt-layout class="neighbor" />
      </div>
    `,
		data: () => ({
			layoutProps: props,
			resized: [],
		}),
		methods: {
			onResize(width) {
				this.resized.push(width);
			},
		},
	};
	const wrapper = mount(Host, {
		attachTo: document.body,
	});
	const [layout, neighbor] = wrapper.findAll('.wt-layout');
	mockRect(layout.element, 400);
	mockRect(neighbor.element, 600);
	return {
		wrapper,
		layout,
	};
};

describe('WtLayout', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtLayout);
		expect(wrapper.classes('wt-layout')).toBe(true);
	});

	it('renders content via default slot', () => {
		const content = 'Layout content';
		const wrapper = shallowMount(WtLayout, {
			slots: {
				default: content,
			},
		});
		expect(wrapper.text()).toBe(content);
	});

	it('is fluid without defaultWidth', () => {
		const wrapper = shallowMount(WtLayout);
		expect(wrapper.classes('wt-layout--fixed')).toBe(false);
		expect(wrapper.attributes('style')).toBeUndefined();
	});

	it('starts at defaultWidth', () => {
		const wrapper = shallowMount(WtLayout, {
			props: {
				defaultWidth: 320,
			},
		});
		expect(wrapper.classes('wt-layout--fixed')).toBe(true);
		expect(wrapper.element.style.flexBasis).toBe('320px');
	});

	it('renders resizer only when resizable', async () => {
		const wrapper = shallowMount(WtLayout);
		expect(wrapper.find('.wt-layout__resizer').exists()).toBe(false);
		await wrapper.setProps({
			resizable: true,
		});
		expect(wrapper.find('.wt-layout__resizer').exists()).toBe(true);
	});

	it('resizes by dragging, bounded by the neighbor min width', async () => {
		const { wrapper, layout } = mountPair({
			resizable: true,
		});
		const resizer = layout.find('.wt-layout__resizer');

		await resizer.trigger('pointerdown', {
			button: 0,
			clientX: 400,
		});
		window.dispatchEvent(
			new PointerEvent('pointermove', {
				clientX: 500,
			}),
		);
		await wrapper.vm.$nextTick();
		expect(layout.element.style.flexBasis).toBe('500px');

		// neighbor is 600px wide with 320px min => max 400 + 280 = 680
		window.dispatchEvent(
			new PointerEvent('pointermove', {
				clientX: 2000,
			}),
		);
		window.dispatchEvent(new PointerEvent('pointerup'));
		await wrapper.vm.$nextTick();
		expect(layout.element.style.flexBasis).toBe('680px');
		expect(wrapper.vm.resized).toEqual([
			680,
		]);
		wrapper.unmount();
	});

	it('does not shrink below its min width', async () => {
		const { wrapper, layout } = mountPair({
			resizable: true,
		});
		const resizer = layout.find('.wt-layout__resizer');

		await resizer.trigger('pointerdown', {
			button: 0,
			clientX: 400,
		});
		window.dispatchEvent(
			new PointerEvent('pointermove', {
				clientX: 0,
			}),
		);
		window.dispatchEvent(new PointerEvent('pointerup'));
		await wrapper.vm.$nextTick();
		expect(layout.element.style.flexBasis).toBe('320px');
		wrapper.unmount();
	});

	it('resizes with arrow keys', async () => {
		const { wrapper, layout } = mountPair({
			resizable: true,
		});
		await layout.find('.wt-layout__resizer').trigger('keydown', {
			key: 'ArrowRight',
		});
		expect(layout.element.style.flexBasis).toBe('416px');
		expect(wrapper.vm.resized).toEqual([
			416,
		]);
		wrapper.unmount();
	});
});
