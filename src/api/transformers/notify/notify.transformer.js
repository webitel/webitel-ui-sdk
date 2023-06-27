import eventBus from '../../../scripts/eventBus';

const notifyTransformer = (notificationObject) => {
  /*
  if passed arg is function, then this notification - static content,
  predefined before actual transformer is called in applyTransform flow
   */
  if (typeof notificationObject === 'function') {
    /*
    so, create a callback which will send notification with params, passed to it
     */
    const callback = ({ type, text }) => eventBus.$emit('notification', { type, text });

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
    eventBus.$emit('notification', {
      type: 'error',
      text: notificationObject.response?.data?.detail || notificationObject.response?.data?.message,
    });
  }
  return notificationObject;
};

export default notifyTransformer;
