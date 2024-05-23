import deepEqual from 'deep-equal';

const changeRouteQuery = (router) => ({ filterQuery, value }) => {
  const name = router.currentRoute?.value?.name || router.currentRoute?.name;
  const query = router.currentRoute?.value?.query ||
    router.currentRoute?.query || {};

  if (deepEqual(query[filterQuery], value)) return;

  const newQuery = {
    ...query,
    [filterQuery]: value,
  };

  console.info('newQuery', newQuery);

  return router.replace({
    name,
    query: newQuery,
  });
};

export default changeRouteQuery;
