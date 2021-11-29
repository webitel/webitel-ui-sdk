import { shallowMount } from '@vue/test-utils';
import WtContextMenu from '../wt-context-menu.vue';

describe('WtContextMenu', () => {
  it('render a component', () => {
    const options = ['1', '2'];
    const wrapper = shallowMount(WtContextMenu, {
      propsData: { options },
    });
    expect(wrapper.classes('wt-context-menu')).toBe(true);
  });

  it('should  check is a the component visible', () => {
    const options = ['1', '2'];
    const wrapper = shallowMount(WtContextMenu, {
      propsData: { options },
    });
    expect(wrapper.find('.wt-context-menu').isVisible()).toBe(true);
  });

  it('depending on "visible" prop should toggle a wt-context-menu-hidden class', () => {
    const visible = true;
    const options = ['1', '2'];
    const wrapper = shallowMount(WtContextMenu, {
      propsData: { options },
    });
    if (!visible) {
      expect(wrapper.classes('wt-context-menu--hidden')).toBe(true);
    }
    expect(wrapper.classes('wt-context-menu--hidden')).toBe(false);
  });

  it('correctly compute a options', () => {
    const options = ['1', '2'];
    const wrapper = shallowMount(WtContextMenu, {
      propsData: { options },
    });
    expect(wrapper.vm.options).toBe(options);
  });

  it('should raise click event when clicked', () => {
    const options = ['1', '2'];
    const wrapper = shallowMount(WtContextMenu, {
      propsData: { options },
    });
    wrapper.find('.wt-context-menu__option').trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('should emit { option, index } when clicked on option', () => {
    const options = ['1', '2'];
    const emittingArgs = { option: '1', index: 0 };
    const wrapper = shallowMount(WtContextMenu, {
      propsData: { options },
    });
    wrapper.find('.wt-context-menu__option').trigger('click');
    expect(wrapper.emitted('click')[0][0]).toEqual(emittingArgs);
  });
});
