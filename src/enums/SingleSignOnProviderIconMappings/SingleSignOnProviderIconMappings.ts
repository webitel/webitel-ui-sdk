import { SingleSignOnProvider } from '../SingleSignOnProvider/SingleSignOnProvider';

export const SingleSignOnProviderIconMappings: Record<
	SingleSignOnProvider,
	string
> = {
	[SingleSignOnProvider.Microsoft]: 'microsoft',
	[SingleSignOnProvider.Google]: 'google',
	[SingleSignOnProvider.Facebook]: 'messenger',
	[SingleSignOnProvider.Custom]: 'custom-provider',
};

export type SingleSignOnProviderIconMappings =
	(typeof SingleSignOnProviderIconMappings)[keyof typeof SingleSignOnProviderIconMappings];
