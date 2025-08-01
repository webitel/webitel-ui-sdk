/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

export type PhonesListPhonesParams = {
	/**
	 * Page number of result dataset records. offset = (page*size)
	 */
	page?: number;
	/**
	 * Size count of records on result page. limit = (size++)
	 */
	size?: number;
	/**
 * Search term: phone number.
`?` - matches any one character
`*` - matches 0 or more characters
 */
	q?: string;
	/**
	 * Sort the result according to fields.
	 */
	sort?: string[];
	/**
	 * Fields to be retrieved into result.
	 */
	fields?: string[];
	/**
	 * Link(s) with unique ID only.
	 */
	id?: string[];
	/**
	 * Primary phone  only.
	 */
	primary?: boolean;
	/**
	 * Verified phone only.
	 */
	verified?: boolean;
	/**
	 * Reference Object unique ID.
	 */
	typeId?: string;
	/**
	 * Reference Object well-known type.
	 */
	typeType?: string;
	/**
	 * Reference Object display name.
	 */
	typeName?: string;
};
