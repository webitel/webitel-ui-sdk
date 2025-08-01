/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

import type { ApiLicenseUser } from './apiLicenseUser';
import type { ApiVerification } from './apiVerification';

export interface ApiLicenseV1 {
	competitive?: boolean;
	id?: string;
	limit?: number;
	notAfter?: string;
	notBefore?: string;
	product?: string;
	/** available */
	remain?: number;
	/** list of known classes, &this product grants mandatory access to, e.g.: 'users', 'roles', 'cc_agent', 'calendars', ... */
	scope?: string[];
	status?: ApiVerification;
	users?: ApiLicenseUser[];
}
