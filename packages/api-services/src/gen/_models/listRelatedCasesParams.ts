/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

export type ListRelatedCasesParams = {
	/**
	 * Page number for pagination.
	 */
	page?: number;
	/**
	 * Number of related cases per page.
	 */
	size?: number;
	/**
	 * Query string for search.
	 */
	q?: string;
	/**
	 * Sorting order.
	 */
	sort?: string;
	/**
	 * Fields to return for each related case.
	 */
	fields?: string[];
	/**
	 * Filter by ids
	 */
	ids?: string[];
};
