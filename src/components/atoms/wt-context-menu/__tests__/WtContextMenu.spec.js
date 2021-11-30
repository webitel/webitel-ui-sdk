import { shallowMount } from '@vue/test-utils';
import WtContextMenu from '../wt-context-menu.vue';

describe('WtContextMenu', () => {
  const options = ['1', '2'];

  it('renders a component', () => {
    const wrapper = shallowMount(WtContextMenu);
    expect(wrapper.classes('wt-context-menu')).toBe(true);
  });

  it('component is visible by default', () => {
    const wrapper = shallowMount(WtContextMenu);
    expect(wrapper.find('.wt-context-menu').isVisible()).toBe(true);
  });

  it('component is invisible, if "visible" prop = false', () => {
    const wrapper = shallowMount(WtContextMenu, {
      propsData: { visible: false },
    });
    expect(wrapper.classes('wt-context-menu--hidden')).toBe(true);
  });

  it('correctly display the options length', () => {
    const wrapper = shallowMount(WtContextMenu, {
      propsData: { options },
    });
    expect(wrapper.findAll('.wt-context-menu__option').length).toBe(options.length);
  });

  it('should raise click event, and emit { option, index } when clicked', () => {
    const emittingArgs = { option: '1', index: 0 };
    const wrapper = shallowMount(WtContextMenu, {
      propsData: { options },
    });

    wrapper.find('.wt-context-menu__option').trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();

    expect(wrapper.emitted('click')[0][0]).toEqual(emittingArgs);
  });
});
