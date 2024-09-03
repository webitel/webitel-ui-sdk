// context === filter "this"
const queryGetter = (context) => (router) => () => {
  if (!router) throw new Error('Router is required for queryGetter!');

  const query = router.currentRoute.value?.query || router.currentRoute.query ||
    {};

  const value = query[context.name];

  if(value && context?.multiple && !Array.isArray(value)) {
    return [value];
  }

  return value;
};

export default queryGetter;
