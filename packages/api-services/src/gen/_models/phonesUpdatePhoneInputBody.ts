/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WebitelContactsLookup } from './webitelContactsLookup';

export type PhonesUpdatePhoneInputBody = {
	/** The phone number. */
	number: string;
	/** Indicates whether this phone number is default within other channels of the same type(phone). */
	primary?: boolean;
	type?: WebitelContactsLookup;
	verified?: boolean;
};
