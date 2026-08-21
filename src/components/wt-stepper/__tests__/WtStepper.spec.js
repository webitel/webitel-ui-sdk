import { mount, shallowMount } from '@vue/test-utils';

import WtStepper from '../wt-stepper.vue';

const steps = [
	{
		name: 'step 1',
		description: 'description 1',
	},
	{
		name: 'step 2',
		description: 'description 2',
	},
	{
		name: 'step 3',
		description: 'description 3',
	},
];

describe('WtStepper', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtStepper, {
			props: {
				steps,
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});

	it('renders a chip for each step', () => {
		const wrapper = mount(WtStepper, {
			props: {
				steps,
			},
		});
		const chips = wrapper.findAllComponents({
			name: 'wt-chip',
		});
		expect(chips.length).toBe(steps.length);
		expect(chips[0].text()).toBe('step 1');
	});

	it('marks steps before the active step as completed', () => {
		const wrapper = shallowMount(WtStepper, {
			props: {
				steps,
				activeStep: 2,
			},
		});
		const chips = wrapper.findAllComponents({
			name: 'wt-chip',
		});
		expect(chips[0].attributes('color')).toBe('primary');
		expect(chips[1].attributes('color')).toBe('primary');
		expect(chips[2].attributes('color')).toBe('secondary');
	});

	it('renders a divider between steps but not before the first one', () => {
		const wrapper = shallowMount(WtStepper, {
			props: {
				steps,
			},
		});
		expect(wrapper.findAll('.wt-stepper-steps__divider').length).toBe(
			steps.length - 1,
		);
	});

	it('renders the description of the active step by default', () => {
		const wrapper = mount(WtStepper, {
			props: {
				steps,
				activeStep: 2,
			},
		});
		expect(wrapper.find('.wt-stepper-description').text()).toBe(
			'description 2',
		);
	});

	it('renders custom content via the description slot', () => {
		const wrapper = shallowMount(WtStepper, {
			props: {
				steps,
			},
			slots: {
				description: 'Custom description',
			},
		});
		expect(wrapper.text()).toContain('Custom description');
		expect(wrapper.find('.wt-stepper-description').exists()).toBe(false);
	});

	it('renders content via the main slot', () => {
		const wrapper = shallowMount(WtStepper, {
			props: {
				steps,
			},
			slots: {
				main: 'Main content',
			},
		});
		expect(wrapper.text()).toContain('Main content');
	});
});
