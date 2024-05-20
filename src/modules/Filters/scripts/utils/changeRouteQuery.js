import deepEqual from 'deep-equal';

const changeRouteQuery = (router) => ({ filterQuery, value }) => {
  if (deepEqual(router.currentRoute.value.query[filterQuery], value)) return;

  const newQuery = {
    ...router.currentRoute.value.query,
    [filterQuery]: value,
  };

  return router.replace({
    name: router.currentRoute.value.name,
    query: newQuery,
  });
};

export default changeRouteQuery;
