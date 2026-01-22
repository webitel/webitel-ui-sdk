export type ResultCallbacks = {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
	onComplete?: () => void;
};
