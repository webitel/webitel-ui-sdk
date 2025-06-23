import { objCamelToSnake } from '../../../scripts/caseConverters.ts';

const camelToSnakeTransformer = (skipKeys) => (obj) =>
  objCamelToSnake(obj, skipKeys);
export default camelToSnakeTransformer;
