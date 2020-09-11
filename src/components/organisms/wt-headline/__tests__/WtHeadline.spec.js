import { shallowMount } from '@vue/test-utils';
import WtHeadline from '../wt-headline.vue';

describe('WtHeadline', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtHeadline, {
      stubs: { WtIconBtn: true },
    });
    expect(wrapper.classes('wt-headline')).toBe(true);
  });

  it('renders headline title via title slot', () => {
    const content = 'Headline title';
    const wrapper = shallowMount(WtHeadline, {
      stubs: { WtIconBtn: true },
      slots: { title: content },
    });
    expect(wrapper.find('.wt-headline__title').text()).toBe(content);
  });

  it('renders headline search via search slot', () => {
    const content = 'Headline search content';
    const wrapper = shallowMount(WtHeadline, {
      stubs: { WtIconBtn: true },
      slots: { search: content },
    });
    expect(wrapper.find('.wt-headline__actions-wrapper').text()).toBe(content);
  });

  it('renders headline actions via actions slot', () => {
    const content = 'Headline actions';
    const wrapper = shallowMount(WtHeadline, {
      stubs: { WtIconBtn: true },
      slots: { actions: content },
    });
    expect(wrapper.find('.wt-headline__actions-wrapper').text()).toBe(content);
  });
});
