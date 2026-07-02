import { SingleSignOnProvider } from '../SingleSignOnProvider/SingleSignOnProvider';

export const SingleSignOnProviderIconMappings: Record<
	SingleSignOnProvider,
	string
> = {
	[SingleSignOnProvider.MICROSOFT]: 'microsoft',
	[SingleSignOnProvider.GOOGLE]: 'google',
	[SingleSignOnProvider.FACEBOOK]: 'messenger',
	[SingleSignOnProvider.CUSTOM]: 'custom-provider',
};

export type SingleSignOnProviderIconMappings =
	(typeof SingleSignOnProviderIconMappings)[keyof typeof SingleSignOnProviderIconMappings];
