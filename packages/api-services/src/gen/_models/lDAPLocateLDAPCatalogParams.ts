/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

export type LDAPLocateLDAPCatalogParams = {
	/**
 * ----- Select Options -------------------------

default: 1
 */
	page?: number;
	/**
	 * default: 16
	 */
	size?: number;
	/**
	 * attributes list
	 */
	fields?: string[];
	/**
	 * e.g.: "updated_at" - ASC; "!updated_at" - DESC;
	 */
	sort?: string[];
	/**
	 * term-of-search: lookup[name]
	 */
	q?: string;
	/**
	 * case-ignore substring match: ILIKE '*' - any; '?' - one
	 */
	name?: string;
	/**
	 * [M]andatory[A]ccess[C]ontrol: with access mode (action) granted!
	 */
	access?: string;
};
