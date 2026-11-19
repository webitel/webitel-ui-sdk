import { AxiosError } from 'axios';
import type { Composer } from 'vue-i18n';

import { config as apiServicesConfig } from '../../../config/config';
import type { Transformer } from '../applyTransform';

type NotificationCallback = (payload: { type: string; text: unknown }) => void;

type StaticNotification = (payload: { callback: NotificationCallback }) => void;

const CONNECTION_ERROR_KEY = 'requestErrors.connection';

// [Claude] no server response (offline, DNS, timeout): the raw "AxiosError: Network Error" means nothing to a user (WTEL-11052)
const isConnectionError = (error: Error) => {
	const { isAxiosError, response, code } = error as AxiosError;
	return !!isAxiosError && !response && code !== AxiosError.ERR_CANCELED;
};

const translateConnectionError = () => {
	const i18n = apiServicesConfig.i18n;
	if (!i18n?.global) return 'Connection error';
	return (i18n.global as Composer).t(CONNECTION_ERROR_KEY);
};

function notifyTransformer(notificationObject: StaticNotification): Transformer;
function notifyTransformer<T>(notificationObject: T): T;
function notifyTransformer(notificationObject: unknown): unknown {
	/*
  if passed arg is function, then this notification - static content,
  predefined before actual transformer is called in applyTransform flow
   */
	if (typeof notificationObject === 'function') {
		/*
    so, create a callback which will send notification with params, passed to it
     */
		const callback: NotificationCallback = ({ type, text }) =>
			apiServicesConfig.eventBus?.$emit('notification', {
				type,
				text,
			});

		/*
    and, then, return a function, which will be called in main applyTransform flow,
    calling passed arg function with callback, and returning actual notify payload
     */
		return (payload: unknown) => {
			(notificationObject as StaticNotification)({
				callback,
			});
			return payload;
		};
	}
	if (notificationObject instanceof Error) {
		const { response } = notificationObject as AxiosError<{
			translation?: string;
			detail?: string;
			message?: string;
		}>;
		const errorText =
			response?.data?.translation ||
			response?.data?.detail ||
			response?.data?.message ||
			(isConnectionError(notificationObject)
				? translateConnectionError()
				: notificationObject);

		apiServicesConfig.eventBus?.$emit('notification', {
			type: 'error',
			text: errorText,
		});
	}
	return notificationObject;
}

/**
 * [Claude] like notify, but silent for network errors (no server response, e.g. offline):
 * for callers that show their own localized error, so the user doesn't also get "AxiosError: Network Error" (WTEL-11052)
 */
export const notifyServerError = <T>(error: T): T => {
	if (
		error instanceof Error &&
		!(error as Error & Pick<AxiosError, 'response'>).response
	) {
		return error;
	}
	return notifyTransformer(error);
};

export default notifyTransformer;
