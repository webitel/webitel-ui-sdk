import { shallowMount } from '@vue/test-utils';
import WtPagination from '../wt-pagination.vue';

describe('WtPagination', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtPagination);
    expect(wrapper.classes('wt-pagination')).toBe(true);
  });

  it('debounces size change event when debounce prop is true', async (done) => {
    const props = {
      size: '10',
      debounce: true,
      debounceDelay: 100,
    };
    const wrapper = shallowMount(WtPagination, {
      props,
    });
    props.size = '20';
    wrapper.setProps(props);
    expect(wrapper.emitted().change).toBeFalsy();
    await setTimeout(() => {
      expect(wrapper.emitted().change[0].length).toBe(1);
      done();
    }, 1000);
  });

  it('changes pages at icon btn click', async () => {
    const wrapper = shallowMount(WtPagination, {
      props: { isNext: true, page: 2 },
    });
    const pageControls = wrapper.findAll('.wt-pagination__page-control');
    pageControls.at(0).vm.$emit('click');
    pageControls.at(1).vm.$emit('click');
    expect(wrapper.emitted().prev.length).toBe(1);
    expect(wrapper.emitted().next.length).toBe(1);
  });
});
