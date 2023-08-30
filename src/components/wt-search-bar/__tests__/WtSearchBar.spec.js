import { shallowMount } from '@vue/test-utils';
import WtSearchBar from '../wt-search-bar.vue';

describe('WtSearchBar', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtSearchBar, {
      stubs: {
        WtIcon: true,
        WtIconBtn: true,
      },
    });
    expect(wrapper.classes('wt-search-bar')).toBe(true);
  });

  it('debounces search event when debounce prop is true', async () => {
    const props = {
      value: '',
      debounce: true,
      debounceDelay: 100,
    };
    const wrapper = shallowMount(WtSearchBar, {
      stubs: {
        WtIcon: true,
        WtIconBtn: true,
      },
      props,
    });
    props.value = 'val';
    wrapper.setProps(props);
    expect(wrapper.emitted().search).toBeFalsy();
    await setTimeout(() => {
      expect(wrapper.emitted().search[0].length).toBe(1);
    }, 1000);
  });
});
