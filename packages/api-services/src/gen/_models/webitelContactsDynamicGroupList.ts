/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WebitelContactsDynamicGroup } from './webitelContactsDynamicGroup';

/**
 * A list of Dynamic Groups.
 */
export interface WebitelContactsDynamicGroupList {
	/** List of dynamic groups. */
	items?: WebitelContactsDynamicGroup[];
	/** Have more records. */
	next?: boolean;
	/** Page number of the partial result. */
	page?: number;
}
