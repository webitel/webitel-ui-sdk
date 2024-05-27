import { shallowMount } from '@vue/test-utils';
import stringify from 'csv-stringify/lib/sync';
import * as fileSaver from 'file-saver';
import CSVExportMixin from '../mixins/exportCSVMixin';
import '../../../../tests/mocks/localStorageMock';

vi.mock('csv-stringify/lib/sync');
vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

const dataList = [
  { _isSelected: true, id: 1 },
  { _isSelected: true, id: 2 },
  { _isSelected: true, id: 3 },
];

describe('CSV Export', () => {
  let wrapper;
  const Component = {
    render() {
    },
    mixins: [CSVExportMixin],
    created() {
      this.initCSVExport(() => ({ items: dataList }), { filename: 'jest' });
    },
    data: () => ({ dataList }),
  };

  it('goes through all important steps to generate and save csv', async () => {
    wrapper = shallowMount(Component);
    await wrapper.vm.exportCSV();
    expect(stringify).toHaveBeenCalled();
    expect(fileSaver.saveAs).toHaveBeenCalled();
  });

  it('mixin correctly computes empty export progress from class data', () => {
    wrapper = shallowMount(Component);
    expect(wrapper.vm.CSVDownloadProgress).toBe(0);
  });

  it('computes selected ids and isAnySelected', async () => {
    wrapper = shallowMount(Component);
    const selectedIds = [1, 2, 3];
    expect(wrapper.vm.selectedIds).toEqual(selectedIds);
    expect(wrapper.vm.isAnySelected).toBe(true);
  });

  it('correctly generates csv headers from passed fields', async () => {
    wrapper = shallowMount(Component);
    const params = { fields: ['id', 'col1', 'columnTwo'] };
    await wrapper.vm.exportCSV(params);
    expect(stringify.mock.calls.pop()[1].columns).toEqual(params.fields); // last mock call, 2nd param, columns obj param
  });

  it('config csv export from localStorage', async () => {
    wrapper = shallowMount(Component);
    const csvExportOptions = {
      header: false,
      delimiter: ';',
    };
    localStorage.setItem('csv-export-options', JSON.stringify(csvExportOptions));
    await wrapper.vm.exportCSV();
    expect(stringify.mock.calls.pop()[1]).toMatchObject(csvExportOptions);
  });
});
