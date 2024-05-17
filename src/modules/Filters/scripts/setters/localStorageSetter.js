function localStorageSetter(rawValue) {
  const key = this.localStorageKey;

  if (!key) throw new Error(`Please provide "localStorageKey" for ${this.name} filter!`);

  const value = Array.isArray(rawValue) ? rawValue.join(',') : rawValue;
  localStorage.setItem(key, value);
  return value;
}

export default localStorageSetter;
