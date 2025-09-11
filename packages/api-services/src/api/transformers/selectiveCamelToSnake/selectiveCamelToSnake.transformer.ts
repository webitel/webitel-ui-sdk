import { get, set } from 'lodash-es';

export function selectiveCamelToSnake(data: any, allowedKeys: string[]): any {
  const result = { ...data };

  allowedKeys.forEach((keyPath) => {
    const value = get(data, keyPath);

    if (value !== undefined) {
      const snakeKeyPath = keyPath
        .split('.')
        .map((k) => k.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`))
        .join('.');

      set(result, snakeKeyPath, value);

      if (snakeKeyPath !== keyPath) {

        const keys = keyPath.split('.');
        const lastKey = keys.pop();
        const parentPath = keys.join('.');
        const parent = get(result, parentPath);
        if (parent && lastKey) {
          delete parent[lastKey];
        }
      }
    }
  });

  return result;
}
