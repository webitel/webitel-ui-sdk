/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

export type CustomersUpdateCustomerParams = {
	/**
	 * [optional] e.g.: Example Org.
	 */
	organization?: string;
	/**
	 * [optional] logo source image
	 */
	logoPicture?: string;
	/**
	 * [optional] raw bytes protobuf::base64.RawStdEncoding != certificate::base64.StdEncoding
	 */
	certificate?: string;
	revoke?: boolean;
};
