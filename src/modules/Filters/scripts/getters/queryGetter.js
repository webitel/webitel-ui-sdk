function queryGetter(router) {
  const name = this.name;
  return () => {
    return router.currentRoute.query[name];
  };
}

export default queryGetter;
