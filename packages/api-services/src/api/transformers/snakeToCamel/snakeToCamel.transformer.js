import { objSnakeToCamel } from '../../../scripts/caseConverters.js';

const snakeToCamelTransformer = (skipKeys) => (obj) =>
  objSnakeToCamel(obj, skipKeys);
export default snakeToCamelTransformer;
