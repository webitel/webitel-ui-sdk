/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

export type CustomersGetCustomerParams = {
	/**
 * Available Filters

show by customer id; serial number (uuid)
 */
	id?: string;
	/**
	 * show if valid only!
	 */
	valid?: boolean;
	/**
	 * identifier
	 */
	domainId?: string;
	/**
	 * display name
	 */
	domainName?: string;
	/**
 * Request Controls

serial,
 */
	fields?: string[];
	sort?: string[];
};
