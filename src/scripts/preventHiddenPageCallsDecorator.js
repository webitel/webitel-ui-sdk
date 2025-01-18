const isPageHidden = () =>
  document.hidden ||
  document.msHidden ||
  document.webkitHidden ||
  document.mozHidden;

const preventHiddenPageCallsDecorator = (method) => (args) =>
  isPageHidden() || method(args);
export default preventHiddenPageCallsDecorator;
