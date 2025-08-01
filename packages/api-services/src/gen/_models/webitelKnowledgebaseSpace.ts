/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WebitelKnowledgebaseLookup } from './webitelKnowledgebaseLookup';

export interface WebitelKnowledgebaseSpace {
	/** The timestamp when the space was created (in Unix time). */
	createdAt?: string;
	/** The user who created the space. */
	createdBy?: WebitelKnowledgebaseLookup;
	/** READONLY. The space's metadata. */
	domain?: WebitelKnowledgebaseLookup;
	/** Unique ID of the latest version of the update.
This ID changes after any update to the underlying value(s). */
	etag?: string;
	/** Indicates if the space has children. */
	hasChildren?: boolean;
	/** BIO. Short description about the space. */
	homePage?: string;
	/** The unique ID of the association. Never changes. */
	id?: string;
	/** [R]ecord[b]ased[A]ccess[C]ontrol mode granted. */
	mode?: string;
	/** The name of the space. */
	name?: string;
	/** The state of the space. */
	state?: boolean;
	/** The timestamp when the space was last updated (in Unix time). */
	updatedAt?: string;
	/** The user who last updated the space. */
	updatedBy?: WebitelKnowledgebaseLookup;
	/** READONLY. Operational attributes
Version of the latest update. Numeric sequence. */
	ver?: number;
}
