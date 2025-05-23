/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * service.proto
 * OpenAPI spec version: version not set
 */
import type { CasesCaseCommunicationsTypes } from './casesCaseCommunicationsTypes';

/**
 * Represents input data for creating or linking a communication.
 */
export interface CasesInputCaseCommunication {
	/** External communication ID. */
	communicationId?: string;
	/** Type of the communication. */
	communicationType?: CasesCaseCommunicationsTypes;
}
