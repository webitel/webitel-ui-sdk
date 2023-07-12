const restore = (localStorageKey) => ({ query }) => {
  if (!query) {
    const value = localStorage.getItem(localStorageKey);
    return value ? value.split(',') : null;
  }
  return query;
};

export default restore;
