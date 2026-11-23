import { FormatDateMode } from '../../../enums';
import { formatDate } from '../../../utils';

export const getExportFilename = (filename: string) => {
	const date = formatDate(Date.now(), FormatDateMode.DATE);
	const time = formatDate(Date.now(), FormatDateMode.TIME_SEC);
	return `${filename}-${date}-${time}`;
};
