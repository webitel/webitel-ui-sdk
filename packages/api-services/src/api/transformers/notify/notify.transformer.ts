import { config as apiServicesConfig } from '../../../config/config';

const notifyTransformer = (notificationObject) => {
	/*
  if passed arg is function, then this notification - static content,
  predefined before actual transformer is called in applyTransform flow
   */
	if (typeof notificationObject === 'function') {
		/*
    so, create a callback which will send notification with params, passed to it
     */
		const callback = ({ type, text }) =>
			apiServicesConfig.eventBus.$emit('notification', {
				type,
				text,
			});

		/*
    and, then, return a function, which will be called in main applyTransform flow,
    calling passed arg function with callback, and returning actual notify payload
     */
		return (payload) => {
			notificationObject({ callback });
			return payload;
		};
	}
	if (notificationObject instanceof Error) {
		apiServicesConfig.eventBus?.$emit('notification', {
			type: 'error',
			text:
				notificationObject.response?.data?.detail ||
				notificationObject.response?.data?.message ||
				notificationObject,
		});
	}
	return notificationObject;
};

export default notifyTransformer;
