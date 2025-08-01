/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { ApiLDAPControl } from './apiLDAPControl';
import type { ApiLDAPSearchRequestTLSConfig } from './apiLDAPSearchRequestTLSConfig';

export interface ApiLDAPSearchRequest {
	attributes?: string[];
	baseObject?: string;
	/** authorization method e.g.: SIMPLE, SAML, NTLM, etc. */
	bind?: string;
	catalogId?: string;
	controls?: ApiLDAPControl[];
	derefAliases?: number;
	filter?: string;
	password?: string;
	scope?: number;
	sizeLimit?: string;
	timeLimit?: string;
	tls?: ApiLDAPSearchRequestTLSConfig;
	typesOnly?: boolean;
	/** URL e.g.: [(ldap|ldapi|ldaps)://]host[:port] */
	url?: string;
	username?: string;
}
