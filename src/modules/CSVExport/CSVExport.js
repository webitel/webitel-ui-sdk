import { saveAs } from 'file-saver';
import stringify from 'csv-stringify/lib/sync';
import { objSnakeToCamel } from '../../scripts/caseConverters';

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

  constructor(fetchMethod, { filename }) {
    if (!fetchMethod) throw new Error('fetch method should be specified!');
    this.fetchMethod = fetchMethod;
    this.filename = filename;
  }

  static _getStringifyOptions() {
    const defaultOptions = {
      header: true,
      delimiter: ',',
    };
    const localStorageOptions = JSON.parse(localStorage.getItem('csv-export-options')) || {};
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
    saveAs(csv, `${this.filename}.csv`);
  }

  async stringify(params = {}) {
    let csv = 'data:text/csv;charset=utf-8,';
    let isNext = false;
    let columns = params?.fields ? objSnakeToCamel(params?.fields) : [];
    let page = 1;

    do {
      // eslint-disable-next-line no-await-in-loop
      const { items, next } = await this.fetchMethod({
        ...params,
        page,
      });
      if (!columns.length && items.length) columns = Object.keys(items[0]);

      const options = {
        ...CSVExport._getStringifyOptions(),
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
