/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { ApiRole } from './apiRole';

export interface ApiSearchRolesResponse {
	items?: ApiRole[];
	next?: boolean;
	/** select: offset {page} */
	page?: number;
	size?: number;
}
