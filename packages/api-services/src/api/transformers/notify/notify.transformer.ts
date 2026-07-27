import type { AxiosError } from 'axios';

import { config as apiServicesConfig } from '../../../config/config';
import type { Transformer } from '../applyTransform';

type NotificationCallback = (payload: { type: string; text: unknown }) => void;

type StaticNotification = (payload: { callback: NotificationCallback }) => void;

/** Called with a notification factory it builds a transformer; otherwise it
 * notifies about the payload it received and passes it through. */
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
			notificationObject;

		apiServicesConfig.eventBus?.$emit('notification', {
			type: 'error',
			text: errorText,
		});
	}
	return notificationObject;
}

export default notifyTransformer;
