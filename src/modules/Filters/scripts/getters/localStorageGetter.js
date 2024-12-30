// context === filter "this"
const localStorageGetter = (context) => () => {
  if (!context)
    throw new Error('Filter context is required for localStorageGetter!');

  const key = context.localStorageKey;

  if (!key)
    throw new Error(
      `Please provide "localStorageKey" for ${context.name} filter!`,
    );

  const value = localStorage.getItem(key);
  if (!value) return null;

  const splitted = value.split(',');
  if (splitted.length === 1) return splitted[0];
  return splitted;
};

export default localStorageGetter;
