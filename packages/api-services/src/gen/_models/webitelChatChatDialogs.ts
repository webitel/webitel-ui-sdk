/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WebitelChatDialog } from './webitelChatDialog';

export interface WebitelChatChatDialogs {
	/** Dataset page of Dialog(s). */
	data?: WebitelChatDialog[];
	next?: boolean;
	/** Page number of results. */
	page?: number;
}
