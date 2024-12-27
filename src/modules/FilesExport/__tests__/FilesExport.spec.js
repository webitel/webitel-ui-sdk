import { shallowMount } from '@vue/test-utils';
import * as fileSaver from 'file-saver-es';
import jszip from 'jszip';
import jszipUtils from 'jszip-utils';
import FilesExportMixin from '../mixins/exportFilesMixin.js';
import '../../../../tests/mocks/localStorageMock';

vi.mock('jszip');
vi.mock('jszip-utils');
vi.mock('file-saver-es', () => ({
  saveAs: vi.fn(),
}));

const dataList = [
  { files: [{ name: 'jest', id: '1', mimeType: 'mime/type' }] },
];
const selectedDataList = [
  {
    _isSelected: true,
    files: [{ name: 'jest1', id: '1', mimeType: 'mime/type' }],
  },
  {
    _isSelected: true,
    files: [{ name: 'jest2', id: '2', mimeType: 'mime/type' }],
  },
];

describe('File Export', () => {
  jszipUtils.getBinaryContent.mockImplementation((url, callback) =>
    callback(null, {}),
  );
  let wrapper;
  const Component = {
    render() {},
    mixins: [FilesExportMixin],
    created() {
      this.initFilesExport({
        fetchMethod: () => ({ items: dataList }),
        filename: 'jest',
      });
    },
    data: () => ({ dataList }),
  };

  it('goes through all important steps to save file', async () => {
    wrapper = shallowMount(Component);
    await wrapper.vm.exportFiles();
    expect(jszip).toHaveBeenCalled();
    expect(jszipUtils.getBinaryContent).toHaveBeenCalled();
    expect(fileSaver.saveAs).toHaveBeenCalled();
  });

  it('mixin correctly computes empty export progress from class data', () => {
    wrapper = shallowMount(Component);
    expect(wrapper.vm.filesDownloadProgress).toBe(0);
    expect(wrapper.vm.filesZippingProgress).toBe(0);
  });

  it('mixin correctly computes selectedFiles()', () => {
    wrapper = shallowMount(Component, {
      computed: {
        selectedItems() {
          return selectedDataList;
        },
      },
    });
    expect(wrapper.vm.getSelectedFiles()).toEqual([
      ...selectedDataList[0].files,
      ...selectedDataList[1].files,
    ]);
  });

  it('mixin catches export error and resets isFilesLoading on export error', async () => {
    wrapper = shallowMount(Component);
    wrapper.vm.FilesExport = null; // like FilesExport wasn't initialized
    // wrapper.vm.FilesExport.exportFiles = function () { throw new Error(); };
    // await expect(async () => Promise.reject(await wrapper.vm.exportFiles())).rejects.toThrowError();
    try {
      await wrapper.vm.exportFiles();
    } catch (err) {
      expect(err).toBeTruthy();
      expect(wrapper.vm.isFilesLoading).toBeFalsy();
    }
  });
});
