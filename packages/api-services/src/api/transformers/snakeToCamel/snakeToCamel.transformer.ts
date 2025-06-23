import { objSnakeToCamel } from '../../../scripts/caseConverters';

const snakeToCamelTransformer = (skipKeys) => (obj) =>
  objSnakeToCamel(obj, skipKeys);
export default snakeToCamelTransformer;
