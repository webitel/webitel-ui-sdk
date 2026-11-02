import { z } from 'zod';

import { i18nIssue } from './i18nIssue';

const isRegExp = (value: string) => {
	try {
		new RegExp(value);
		return true;
	} catch {
		return false;
	}
};

/** [Claude] a string the browser accepts as a RegExp source, e.g. a dialplan pattern */
export const regExpSchema = z
	.string()
	.refine(isRegExp, i18nIssue('regExpValidator'));
