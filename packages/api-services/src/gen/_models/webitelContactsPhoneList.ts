/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WebitelContactsPhoneNumber } from './webitelContactsPhoneNumber';

/**
 * PhoneNumber dataset.
 */
export interface WebitelContactsPhoneList {
	/** PhoneNumber dataset page. */
	data?: WebitelContactsPhoneNumber[];
	next?: boolean;
	/** The page number of the partial result. */
	page?: number;
}
