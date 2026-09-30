import type { WebitelCasesInputCaseLink } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';
import type { ZodShape } from '../types';

const urlProtocols = [
	'http:',
	'https:',
	'ftp:',
];

const isValidUrl = (value: string) => {
	try {
		return urlProtocols.includes(new URL(value).protocol);
	} catch {
		return false;
	}
};

export const caseLinkSchema = z.object<ZodShape<WebitelCasesInputCaseLink>>({
	url: z
		.string()
		.min(1)
		.refine((value) => !value || isValidUrl(value), i18nIssue('url')),
	name: z.string().optional(),
});

export type CaseLink = z.infer<typeof caseLinkSchema>;
