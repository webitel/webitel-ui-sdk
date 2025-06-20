/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

/**
 * An input of the Space's Articles.
 */
export interface WebitelKnowledgebaseInputArticle {
	/** Tags associated with the article. */
	tags?: string[];
	/** Unique ID of the latest version of an existing resource. */
	etag: string;
	/** The parent article ID. */
	parentArticle?: string;
	/** Indicates that the article is pinned on the top of list. */
	pinned?: boolean;
	/** [VALUE]: --------------------------------------
Space ID associated with. */
	spaceId?: string;
	/** Indicates if article is active and actual. */
	state?: boolean;
	/** The text content of the article. */
	text?: string;
	/** The title of the article. */
	title?: string;
}
