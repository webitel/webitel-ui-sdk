/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { EngineLookup } from './engineLookup';

export interface EngineMemberCommunication {
	attempts?: number;
	description?: string;
	destination?: string;
	display?: string;
	dtmf?: string;
	id?: string;
	lastActivityAt?: string;
	lastCause?: string;
	priority?: number;
	resource?: EngineLookup;
	state?: number;
	stopAt?: string;
	type?: EngineLookup;
}
