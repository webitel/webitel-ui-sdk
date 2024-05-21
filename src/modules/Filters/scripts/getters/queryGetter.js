
// context === filter "this"
const queryGetter = (context) => (router) => () => {
  if (!router) throw new Error('Router is required for queryGetter!');
  if (!router) throw new Error('Router is required for queryGetter!');

  return router.currentRoute.value.query[context.name];
};

export default queryGetter;
