/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * service.proto
 * OpenAPI spec version: version not set
 */

export type ListFilesParams = {
	/**
	 * The page number to retrieve.
	 */
	page?: number;
	/**
	 * Number of items per page.
	 */
	size?: number;
	/**
	 * Search term.
	 */
	q?: string;
	/**
	 * Fields to include in the response.
	 */
	fields?: string[];
	/**
	 * Array of requested id.
	 */
	ids?: string[];
	/**
	 * Sorting
	 */
	sort?: string;
};
