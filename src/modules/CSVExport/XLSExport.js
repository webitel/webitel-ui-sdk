import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver-es';
import { objSnakeToCamel } from '../../scripts/caseConverters.js';

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

  filterDataByColumns(data, columns) {
    return data.map(item => {
      let filteredItem = {};
      columns.forEach(column => {
        if (item.hasOwnProperty(column)) {
          filteredItem[column] = item[column];
        }
      });
      return filteredItem;
    });
  }

  save(data, columns) {
    console.log('xls save', data, columns);
    const filteredData = this.filterDataByColumns(data, columns);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `${this.filename}.xlsx`);
  }

  async fetchAndPrepareData(params) {
    let data = [];
    let isNext = false;
    let page = 1;
    let columns = params._columns ||
      (params?.fields ? objSnakeToCamel(params?.fields) : []);

    console.log('xls columns', columns);
    console.log('xls params', params);
    do {
      const { items, next } = await this.fetchMethod({
        ...params,
        page,
      });
      if (!columns.length && items.length) columns = Object.keys(items[0]);
      data = data.concat(items);
      this.downloadProgress.count += items.length;

      isNext = next;
      page += 1;
    } while (isNext);
    console.log('xls data', data);
    return { data, columns };
  }

  async export(params) {
    const { data, columns } = await this.fetchAndPrepareData(params);
    console.log('xls export params', data);
    this.save(data, columns);
    this.resetProgress();
  }
}
