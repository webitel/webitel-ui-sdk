// context === filter "this"

const localStorageSetter = (context) => (rawValue) => {
  if (!context) throw new Error('Filter context is required for localStorageSetter!');

  const key = context.localStorageKey;

  if (!key) throw new Error(`Please provide "localStorageKey" for ${context.name} filter!`);

  const value = Array.isArray(rawValue) ? rawValue.join(',') : rawValue;
  localStorage.setItem(key, value);

  return context;
};

export default localStorageSetter;
