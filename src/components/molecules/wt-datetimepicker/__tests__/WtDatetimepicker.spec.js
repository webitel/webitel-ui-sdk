import { shallowMount, mount } from '@vue/test-utils';
import FloatingVue, { Dropdown, Popper } from 'floating-vue';
import WtDatetimepicker from '../wt-datetimepicker.vue';
import WtLabel from '../../wt-label/wt-label.vue';
import WtIcon from '../../../atoms/wt-icon/wt-icon.vue';
import WtButton from '../../../atoms/wt-button/wt-button.vue';

describe('WtDatetimepicker', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtDatetimepicker, {
      global: {
        plugins: [FloatingVue],
        stubs: {
          WtLabel,
          WtIcon,
          WtButton,
          WtTimepicker: true,
        },
      },
    });
    expect(wrapper.classes('wt-datetimepicker')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = mount(WtDatetimepicker, {
      global: {
        plugins: [FloatingVue],
        stubs: {
          WtLabel,
          WtIcon,
          WtButton,
          WtTimepicker: true,
        },
      },
      props: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });

  it('opens form at preview click', async () => {
    const wrapper = shallowMount(WtDatetimepicker, {
      // stubs: {
      //   WtLabel,
      //   WtIcon,
      //   WtButton,
      //   WtTimepicker: true,
      // },
    });
    expect(wrapper.find('.wt-datetimepicker__form').element).not.toBeVisible();
    wrapper.find('.wt-datetimepicker__preview').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.wt-datetimepicker__form').isVisible()).toBe(true);
  });

  // dunno how to test content of VDropdown popper template :(
  // it('Triggers change event after button "add" click', async () => {
  //   const now = Date.now();
  //   const wrapper = mount(WtDatetimepicker, {
  //     localVue,
  //     stubs: {
  //       WtLabel,
  //       WtIcon,
  //       WtButton,
  //       VDropdown: Dropdown,
  //       WtTimepicker: true,
  //     },
  //     props: {
  //       value: now,
  //     },
  //   });
  //   wrapper.setData({ isOpened: true });
  //   // wrapper.find('.wt-datetimepicker__preview').trigger('keyup.enter');
  //   await wrapper.vm.$nextTick();
  //   await wrapper.vm.$nextTick();
  //   await wrapper.vm.$nextTick();
  //   console.info(wrapper.html());
  //   expect(wrapper.find('.wt-datetimepicker__form').exists()).toBe(true);
  //   wrapper.find('.wt-datetimepicker__actions > .wt-button').trigger('click');
  //   expect(wrapper.emitted().change.pop()).toEqual([now]);
  // });
});
