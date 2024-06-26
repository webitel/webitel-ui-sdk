import stringify from 'csv-stringify/lib/sync.js';
import { saveAs } from 'file-saver-es';
import { objSnakeToCamel } from '../../scripts/caseConverters.js';

const cast = {
  object: (separator) => {
    const cast = (object) => {
      if (Array.isArray(object)) {
        return object.map((item) => cast(item))
        .join(separator);
      }
      return object.name || JSON.stringify(object);
    };
    return cast;
  },
};

export default class CSVExport {
  filename = 'export';

  fetchMethod = null;

  downloadProgress = { count: 0 };

  constructor(fetchMethod, { filename, delimiter }) {
    if (!fetchMethod) throw new Error('fetch method should be specified!');
    this.fetchMethod = fetchMethod;
    this.filename = filename;
    this.delimiter = delimiter || ',';
  }

  static _getStringifyOptions(delimiter) {
    const defaultOptions = {
      header: true,
      delimiter,
    };
    const localStorageOptions = JSON.parse(localStorage.getItem('csv-export-options')) ||
      {};
    return {
      ...defaultOptions,
      ...localStorageOptions,
      cast: {
        object: cast.object(localStorageOptions.valueDelimiter || ' | '),
      },
    };
  }

  resetProgress() {
    this.downloadProgress = { count: 0 };
    this.zippingProgress = { percent: 0 };
  }

  save(csv) {
    const blob = new Blob([csv], { type: 'data:text/csv;charset=utf-8' });
    saveAs(blob, `${this.filename}.csv`);
  }

  async stringify(params = {}) {
    let csv = '';
    let isNext = false;
    // why _columns? https://webitel.atlassian.net/browse/DEV-3797
    let columns = params._columns ||
      (params?.fields ? objSnakeToCamel(params?.fields) : []);
    let page = 1;

    do {

      const { items, next } = await this.fetchMethod({
        ...params,
        page,
      });
      if (!columns.length && items.length) columns = Object.keys(items[0]);

      const options = {
        ...CSVExport._getStringifyOptions(params.delimiter),
        columns,
      };

      csv += stringify(items, options);
      this.downloadProgress.count += items.length;

      isNext = next;
      page += 1;
    } while (isNext);
    return csv;
  }

  async export(params) {
    const csv = await this.stringify(params);
    this.save(csv);
    this.resetProgress();
  }
}
