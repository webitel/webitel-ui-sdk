/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

/**
 * Input of the photo.
 */
export interface WebitelContactsInputPhoto {
	/** Unique ID of the latest version of an existing association. */
	etag?: string;
	photoId?: string;
	photoUrl?: string;
	/** True if the photo is a default photo; false if the photo is a user-provided photo. */
	primary?: boolean;
}
