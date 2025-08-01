/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WebitelCasesRelationType } from './webitelCasesRelationType';

/**
 * Structure for related cases input when creating a case.
 */
export interface WebitelCasesCreateCaseRelatedCaseInput {
	/** Etag of the related case. */
	etag?: string;
	/** Identifier of the related case. */
	relatedTo?: string;
	/** Type of relation (e.g., duplicate, linked). */
	relationType?: WebitelCasesRelationType;
}
