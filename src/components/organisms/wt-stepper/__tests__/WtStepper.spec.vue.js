import { shallowMount } from '@vue/test-utils';
import WtStepper from '../wt-stepper.vue';

describe('WtStepper', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtStepper, {
      props: {
        steps: [
          {
            name: 'step 1',
            description: 'description',
          },
        ],
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
