/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { SearchCommunicationTypeChannelItem } from './searchCommunicationTypeChannelItem';

export type SearchCommunicationTypeParams = {
	page?: number;
	size?: number;
	q?: string;
	sort?: string;
	fields?: string[];
	id?: number[];
	channel?: SearchCommunicationTypeChannelItem[];
	default?: boolean;
};
