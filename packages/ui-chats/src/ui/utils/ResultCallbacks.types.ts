// Defined locally so consumers (and this package's .d.ts) do not depend on
// @webitel/ui-sdk/src/types package-export resolution.
export type ResultCallbacks = {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
	onComplete?: () => void;
};
