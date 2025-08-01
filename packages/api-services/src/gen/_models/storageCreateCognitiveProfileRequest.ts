/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { StorageCreateCognitiveProfileRequestProperties } from './storageCreateCognitiveProfileRequestProperties';
import type { StorageProviderType } from './storageProviderType';
import type { StorageServiceType } from './storageServiceType';

/**
 * Create cognitive profile request body for TTS and TTS
 */
export interface StorageCreateCognitiveProfileRequest {
	default?: boolean;
	description?: string;
	enabled?: boolean;
	name: string;
	properties: StorageCreateCognitiveProfileRequestProperties;
	provider: StorageProviderType;
	service: StorageServiceType;
}
