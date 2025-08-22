import { objSnakeToCamel } from '../../../utils/api/caseConverters';

const snakeToCamelTransformer =
	(skipKeys = []) =>
	(obj) =>
		objSnakeToCamel(obj, skipKeys);
export default snakeToCamelTransformer;
