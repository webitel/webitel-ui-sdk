import { saveAs } from 'file-saver-es';
import JSZip from 'jszip';
import jszipUtils from 'jszip-utils';
import path from 'path-browserify';
import generateMediaURL from './scripts/generateMediaURL.js';

export default class FilesExport {
  filename = 'files';

  fetchMethod = null;

  isLoading = false;

  downloadProgress = { count: 0 };

  zippingProgress = { percent: 0 };

  filesURL = generateMediaURL;

  constructor({ fetchMethod, filename, filesURL }) {
    if (fetchMethod) this.fetchMethod = fetchMethod;
    if (filename) this.filename = filename;
    if (filesURL) this.filesURL = filesURL;
  }

  _fetchFileBinary(fileId) {
    const url = this.filesURL(fileId);
    return new Promise((resolve, reject) => (
      jszipUtils.getBinaryContent(url, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })));
  }

  resetProgress() {
    this.downloadProgress = { count: 0 };
    this.zippingProgress = { percent: 0 };
  }

  async _addFilesToZip(items, zip) {
    for (const item of items) {
      if (item.files) {
        await this._addFilesToZip(item.files, zip);
      } else {
        const binary = await this._fetchFileBinary(item.id);
        const ext = item.mimeType.split('/').pop();
        // itemName needed to remove extension from item.name https://stackoverflow.com/a/31615711
        const itemName = path.parse(item.name).name;
        zip.file(`${itemName}.${ext}`, binary);
        this.downloadProgress.count += 1;
      }
    }
  }

  async _generateZip(zip) {
    try {
      return await zip.generateAsync({ type: 'blob' }, (progress) => {
        this.zippingProgress = progress;
      });
    } catch (err) {
      throw new Error('Failed to generate zip file');
    }
  }

  async _saveZip(file) {
    try {
      saveAs(file, `${this.filename}.zip`);
    } catch (err) {
      throw new Error('Failed to save a file');
    }
  }

  async _fetchAndZip(zip, requestParams) {
    const params = {
      from: 0,
      size: 5000,
      fields: ['files'],
      ...requestParams,
    };

    let page = 1;
    let isNext = false;
    do {
      const { items, next } = await this.fetchMethod({ ...params, page });
      await this._addFilesToZip(items, zip);

      isNext = next;
      page += 1;
    } while (isNext);
  }

  async exportFiles(files, { reqParams }) {
    try {
      this.isLoading = true;
      const zip = new JSZip();
      if (files && files.length) await this._addFilesToZip(files, zip);
      else {
        await this._fetchAndZip(zip, reqParams);
      }
      const file = await this._generateZip(zip);
      await this._saveZip(file);
      this.resetProgress();
    } catch (err) {
      throw err;
    } finally {
      this.isLoading = false;
    }
  }
}
