function queryGetter(router) {
  const name = this.name;
  return () => {
    return router.currentRoute.value.query[name];
  };
}

export default queryGetter;
