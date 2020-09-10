import { shallowMount } from '@vue/test-utils';
import WtDatetimepicker from '../wt-datetimepicker.vue';
import WtLabel from '../../../atoms/wt-label/wt-label.vue';
import WtIcon from '../../../atoms/wt-icon/wt-icon.vue';
import WtButton from '../../../atoms/wt-button/wt-button.vue';

describe('WtDatetimepicker', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtDatetimepicker, {
      stubs: {
        WtLabel,
        WtIcon,
        WtButton,
        WtTimepicker: true,
      },
      directives: {
        clickaway: true,
      },
    });
    expect(wrapper.classes('wt-datetimepicker')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = shallowMount(WtDatetimepicker, {
      stubs: {
        WtLabel,
        WtIcon,
        WtButton,
        WtTimepicker: true,
      },
      directives: { clickaway: true },
      propsData: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });

  it('opens form at preview click', async () => {
    const wrapper = shallowMount(WtDatetimepicker, {
      stubs: {
        WtLabel,
        WtIcon,
        WtButton,
        WtTimepicker: true,
      },
      directives: { clickaway: true },
    });
    expect(wrapper.find('.wt-datetimepicker__form').element).not.toBeVisible();
    wrapper.find('.wt-datetimepicker__preview').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.wt-datetimepicker__form').element).toBeVisible();
  });

  it('Triggers change event after button "add" click', async () => {
    const now = Date.now();
    const wrapper = shallowMount(WtDatetimepicker, {
      stubs: {
        WtLabel,
        WtIcon,
        WtButton,
        WtTimepicker: true,
      },
      directives: { clickaway: true },
      propsData: {
        value: now,
      },
    });
    wrapper.find('.wt-datetimepicker__preview').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.find('.wt-datetimepicker__actions > .wt-button').trigger('click');
    expect(wrapper.emitted().change.pop()).toEqual([now]);
  });
});
