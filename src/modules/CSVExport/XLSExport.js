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

  // NOTE: if the value is an object with a name property, extract the name to display it in the EXEL file
  extractNameFromObject(value) {
    if (value && typeof value === 'object' && value.name) {
      return value.name;
    }
    return value;
  }

  // NOTE: creates a new object that only includes the properties specified in the columns array
  filterDataByColumns(data, columns) {
    return data.map(item => {
      let filteredItem = {};
      columns.forEach(column => {
        const value = item.hasOwnProperty(column) ? this.extractNameFromObject(item[column]) : ''; // '' needed to display column that has no data
        filteredItem[column] = value;
      });
      return filteredItem;
    });
  }

  // NOTE: calculates the width of the columns based on the data to display it in the EXEL file
  calculateColumnWidths(data, columns) {
    return columns.map(column => {
      const maxLength = data.reduce((max, item) => {
        const value = item[column] || '';
        return Math.max(max, value.toString().length);
      }, column.length);
      return { wch: maxLength + 2 }; // Adding some padding
    });
  }

  save(data, columns) {
    const filteredData = this.filterDataByColumns(data, columns);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const columnWidths = this.calculateColumnWidths(filteredData, columns);
    ws['!cols'] = columnWidths;
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
    return { data, columns };
  }

  async export(params) {
    const { data, columns } = await this.fetchAndPrepareData(params);
    this.save(data, columns);
    this.resetProgress();
  }
}
