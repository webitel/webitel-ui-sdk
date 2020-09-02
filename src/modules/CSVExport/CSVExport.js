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

  constructor(fetchMethod, { filename }) {
    if (!fetchMethod) throw new Error('fetch method should be specified!');
    this.fetchMethod = fetchMethod;
    this.filename = filename;
  }

  static _getStringifyOptions() {
    const localStorageOptions = localStorage.getItem('csv-export-options') || {};
    return {
      header: localStorageOptions.header || true,
      delimiter: localStorageOptions.delimiter || ',',
      cast: {
        object: cast.object(localStorageOptions.valueDelimiter || ' | '),
      },
    };
  }

  save(csv) {
    saveAs(csv, `${this.filename}.csv`);
  }

  async stringify(params) {
    let csv = 'data:text/csv;charset=utf-8,';
    let isNext = false;
    let columns = objSnakeToCamel(params?.fields) || [];
    let page = 1;

    do {
      // eslint-disable-next-line no-await-in-loop
      const { items, next } = await this.fetchMethod({
        ...params,
        page,
      });
      if (!columns.length) columns = Object.keys(items[0]);

      const options = {
        ...CSVExport._getStringifyOptions(),
        columns,
      };
      csv += stringify(items, options);

      isNext = next;
      page += 1;
    } while (isNext);
    return csv;
  }

  async export(params) {
    const csv = await this.stringify(params);
    return this.save(csv);
  }
}
