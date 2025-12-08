import { parse } from 'csv-parse';

const parseCSV = (csvStr, options = {}) =>
  new Promise((resolve, reject) => {
    const callback = (err, output) => {
      if (output) resolve(output, err);
      reject(err);
    };

    parse(csvStr, options, callback);
  });

export default parseCSV;
