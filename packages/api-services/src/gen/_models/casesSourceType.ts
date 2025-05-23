/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * service.proto
 * OpenAPI spec version: version not set
 */

/**
 * Represents a source type for the source entity.

 - TYPE_UNSPECIFIED: Unspecified source type.
 - CALL: Phone call source type.
 - CHAT: Chat source type.
 - SOCIAL_MEDIA: Social media source type.
 - EMAIL: Email source type.
 - API: API source type.
 - MANUAL: Manual source type.
 */
export type CasesSourceType =
	(typeof CasesSourceType)[keyof typeof CasesSourceType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CasesSourceType = {
	TYPE_UNSPECIFIED: 'TYPE_UNSPECIFIED',
	CALL: 'CALL',
	CHAT: 'CHAT',
	SOCIAL_MEDIA: 'SOCIAL_MEDIA',
	EMAIL: 'EMAIL',
	API: 'API',
	MANUAL: 'MANUAL',
} as const;
