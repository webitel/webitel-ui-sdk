/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

export interface ApiLDAPDeleteLDAPTemplateBody {
	baseDn?: string;
	disabled?: boolean;
	enabled?: boolean;
	fields?: string[];
	id?: string[];
	name?: string;
	objclass?: string;
	/** default: 1 */
	page?: number;
	q?: string;
	size?: number;
	sort?: string[];
}
