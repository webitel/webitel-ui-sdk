import { objCamelToSnake } from '../../../scripts/caseConverters';

const camelToSnakeTransformer = (skipKeys) => (obj) =>
	objCamelToSnake(obj, skipKeys);
export default camelToSnakeTransformer;
