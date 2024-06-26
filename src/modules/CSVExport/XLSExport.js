import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver-es';

export default class XLSExport {
  filename = 'export';

  fetchMethod = null;

  downloadProgress = { count: 0 };

  constructor(fetchMethod, { filename }) {
    if (!fetchMethod) throw new Error('fetch method should be specified!');
    this.fetchMethod = fetchMethod;
    this.filename = filename;
  }

  resetProgress() {
    this.downloadProgress = { count: 0 };
  }

  save(data) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `${this.filename}.xlsx`);
  }

  async export(params) {
    let data = [];
    let isNext = false;
    let page = 1;

    do {
      const { items, next } = await this.fetchMethod({
        ...params,
        page,
      });
      data = data.concat(items);
      this.downloadProgress.count += items.length;

      isNext = next;
      page += 1;
    } while (isNext);

    this.save(data);
    this.resetProgress();
  }
}
