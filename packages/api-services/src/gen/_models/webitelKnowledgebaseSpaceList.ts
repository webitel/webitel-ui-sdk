/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WebitelKnowledgebaseSpace } from './webitelKnowledgebaseSpace';

export interface WebitelKnowledgebaseSpaceList {
	/** Space(s) dataset page. */
	data?: WebitelKnowledgebaseSpace[];
	next?: boolean;
	/** The page number of the partial result. */
	page?: number;
}
