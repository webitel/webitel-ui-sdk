import { objCamelToSnake } from '../../../utils/api/caseConverters';

const camelToSnakeTransformer =
	(skipKeys: string[] = []) =>
	(obj) =>
		objCamelToSnake(obj, skipKeys);
export default camelToSnakeTransformer;
