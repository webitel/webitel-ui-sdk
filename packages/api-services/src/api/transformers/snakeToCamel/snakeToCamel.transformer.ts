import { objSnakeToCamel } from '../../../scripts/caseConverters.ts';

const snakeToCamelTransformer = (skipKeys) => (obj) =>
  objSnakeToCamel(obj, skipKeys);
export default snakeToCamelTransformer;
