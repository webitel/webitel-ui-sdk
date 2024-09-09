const editProxy = (item) =>
  new Proxy(item, {
    set(obj, prop, value) {
      obj._dirty = true;
      obj[prop] = value;
      return obj;
    },
  });

export default editProxy;
