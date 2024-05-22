
// context === filter "this"
const queryGetter = (context) => (router) => () => {
  if (!router) throw new Error('Router is required for queryGetter!');

  const query = router.currentRoute.value?.query || router.currentRoute.query ||
    {};

  return query[context.name];
};

export default queryGetter;
