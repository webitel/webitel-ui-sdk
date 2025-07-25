/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { GeneralLookup } from './generalLookup';

/**
 * Represents input data for creating or linking a communication.
 */
export interface WebitelCasesInputCaseCommunication {
	/** External communication ID. */
	communicationId?: string;
	/** Type of the communication. */
	communicationType?: GeneralLookup;
}
