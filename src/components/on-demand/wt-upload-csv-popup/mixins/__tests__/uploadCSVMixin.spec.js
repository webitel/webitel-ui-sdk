import { shallowMount } from '@vue/test-utils';

import UploadCsvMixin from '../uploadCSVMixin.js';

const Component = {
  mixins: [UploadCsvMixin],
  render() {},
};

const makeFile = (content) => {
  const blob = new Blob([content], { type: 'text/csv' });
  return new File([blob], 'test.csv', { type: 'text/csv' });
};

describe('UploadCsvMixin', () => {
  it('renders a component with mixin', () => {
    const wrapper = shallowMount(Component, {
      props: {
        file: {},
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('parses and saves simple csv', async () => {
    const csv = `
      col1,col2
      John,30
      Jane,25
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

    const mappings = [
      {
        name: 'name',
        csv: 'col1',
      },
      {
        name: 'age',
        csv: 'col2',
      },
    ];

    const saveCallback = vi.fn();

    const wrapper = shallowMount(Component, {
      props: {
        file: makeFile(csv),
        addBulkItems: saveCallback,
        mappingFields: mappings,
      },
      data: () => ({
        skipHeaders: true,
      }),
    });

    await wrapper.vm.initUploadPopup();

    // parse file
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    await wrapper.vm.processCSV();
    expect(saveCallback).toHaveBeenCalledWith([
      { name: 'John', age: '30' },
      { name: 'Jane', age: '25' },
    ]);
  });

  it('parsing of csv with empty required throws error', async () => {
    const csv = `
      col1,col2
      John,
      Jane,25
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

    const mappings = [
      {
        name: 'name',
        csv: 'col1',
        required: true,
      },
      {
        name: 'age',
        csv: 'col2',
        required: true,
      },
    ];

    const saveCallback = vi.fn();

    const wrapper = shallowMount(Component, {
      props: {
        file: makeFile(csv),
        addBulkItems: saveCallback,
        mappingFields: mappings,
      },
      data: () => ({
        skipHeaders: true,
      }),
    });

    // parse file
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    try {
      await wrapper.vm.processCSV();
    } catch (err) {
      expect(err).toBeTruthy();
    }

    expect(saveCallback).not.toHaveBeenCalled();
  });

  it('parsing of csv with multiple columns selected to required field', async () => {
    const csv = `
      col1,col2,col3
      John,,30
      Jane,25,
      `.replaceAll(/ +?/g, ''); // replace all whitespaces, but not newlines

    const mappings = [
      {
        name: 'name',
        csv: 'col1',
        required: true,
      },
      {
        name: 'age',
        csv: ['col2', 'col3'],
        required: true,
      },
    ];

    const saveCallback = vi.fn();

    const wrapper = shallowMount(Component, {
      props: {
        file: makeFile(csv),
        addBulkItems: saveCallback,
        mappingFields: mappings,
      },
      data: () => ({
        skipHeaders: true,
      }),
    });

    await wrapper.vm.initUploadPopup();

    // parse file
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    await wrapper.vm.processCSV();
    expect(saveCallback).toHaveBeenCalledWith([
      {
        name: 'John',
        age: ['', '30'],
      },
      {
        name: 'Jane',
        age: ['25', ''],
      },
    ]);
  });
});
