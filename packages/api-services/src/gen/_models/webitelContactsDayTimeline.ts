/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WebitelContactsEvent } from './webitelContactsEvent';

export interface WebitelContactsDayTimeline {
	callsCount?: string;
	chatsCount?: string;
	dayTimestamp?: string;
	emailsCount?: string;
	items?: WebitelContactsEvent[];
}
