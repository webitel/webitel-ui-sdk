/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { LoggerLookup } from './loggerLookup';

export interface LoggerPatchConfigRequest {
	configId?: number;
	daysToStore?: number;
	description?: string;
	enabled?: boolean;
	fields?: string[];
	period?: number;
	storage?: LoggerLookup;
}
