function localStorageGetter() {
  const key = this.localStorageKey;

  if (!key) throw new Error(`Please provide "localStorageKey" for ${this.name} filter!`);

  const value = localStorage.getItem(key);
  if (!value) return null;

  const splitted = value.split(',');
  if (splitted.length === 1) return splitted[0];
  return splitted;
}

export default localStorageGetter;
