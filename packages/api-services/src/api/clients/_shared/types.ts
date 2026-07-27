/**
 * Request shapes shared by the hand-written API clients.
 *
 * TODO(types): payloads stay loosely typed because every client funnels them
 * through `applyTransform` (case conversion, sanitizing, merging defaults)
 * before they reach a generated client, so the generated request types cannot
 * be applied at this boundary yet.
 */
// biome-ignore lint/suspicious/noExplicitAny: loosely typed request payloads, see TODO above
export type ApiParams = Record<string, any>;

/** Most services take string ids; a few generated clients declare `number`. */
export type ApiId = string;

export interface GetItemParams<Id = ApiId> {
	itemId: Id;
}

export interface AddItemParams {
	itemInstance: ApiParams;
}

export interface UpdateItemParams<Id = ApiId> {
	itemInstance: ApiParams;
	itemId: Id;
}

export interface PatchItemParams<Id = ApiId> {
	changes: ApiParams;
	id: Id;
}

export interface DeleteItemParams<Id = ApiId> {
	id: Id;
}
