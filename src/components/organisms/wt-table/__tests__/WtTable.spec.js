import { shallowMount } from '@vue/test-utils';
import WtTable from '../wt-table.vue';
import WtCheckbox from '../../../molecules/wt-checkbox/wt-checkbox.vue';

const headers = [
  {
    text: 'heading 1',
    value: 'h1',
  },
  {
    text: 'heading2',
    value: 'h2',
  },
  {
    text: 'heading 3',
    value: 'h3',
  },
];
const data = [
  {
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  },
  {
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  },
  {
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  },
  {
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  }];

describe('WtTable', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTable);
    expect(wrapper.classes('wt-table')).toBe(true);
  });

  it('renders table data rows', () => {
    const wrapper = shallowMount(WtTable, {
      propsData: {
        headers,
        data,
      },
    });
    expect(wrapper.findAll('.wt-table__tr__body').length).toBe(data.length);
  });

  it('renders table headers', () => {
    const wrapper = shallowMount(WtTable, {
      propsData: {
        headers,
        data,
        selectable: false,
        gridActions: false,
      },
    });
    expect(wrapper.findAll('.wt-table__tr__head th').length).toBe(headers.length);
  });

  it('emits sort event at header click when sortable is true', () => {
    const wrapper = shallowMount(WtTable, {
      propsData: {
        headers,
        data,
        sortable: true,
      },
    });
    wrapper.find('.wt-table__th--sortable').trigger('click');
    expect(wrapper.emitted().sort.pop()).toBeTruthy();
  });

  it('draws sort arrow, if a column is sorted', () => {
    headers[0].sort = 'asc';
    const wrapper = shallowMount(WtTable, {
      propsData: {
        headers,
        data,
        sortable: true,
      },
    });
    expect(wrapper
      .find('.wt-table__th--sortable .wt-table__th__sort-arrow')
      .exists()).toBe(true);
  });

  it('selects all rows at header checkbox click', async () => {
    const wrapper = shallowMount(WtTable, {
      propsData: {
        headers,
        data,
        selectable: true,
      },
    });
    wrapper.findComponent(WtCheckbox).vm.$emit('change');
    expect(data.every((item) => item._isSelected)).toBe(true);
  });
});
