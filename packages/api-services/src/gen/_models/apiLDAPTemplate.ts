/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { ApiLDAPTemplateAgent } from './apiLDAPTemplateAgent';
import type { ApiLDAPTemplateDevice } from './apiLDAPTemplateDevice';
import type { ApiLDAPTemplateRole } from './apiLDAPTemplateRole';
import type { ApiLDAPTemplateUser } from './apiLDAPTemplateUser';
import type { ApiObjectId } from './apiObjectId';
import type { ApiUserId } from './apiUserId';

export interface ApiLDAPTemplate {
	agent?: ApiLDAPTemplateAgent;
	baseDn?: string;
	catalog?: ApiObjectId;
	/** unix */
	createdAt?: string;
	createdBy?: ApiUserId;
	device?: ApiLDAPTemplateDevice;
	enabled?: boolean;
	id?: string;
	name?: string;
	role?: ApiLDAPTemplateRole;
	search?: string;
	updatedAt?: string;
	updatedBy?: ApiUserId;
	user?: ApiLDAPTemplateUser;
}
