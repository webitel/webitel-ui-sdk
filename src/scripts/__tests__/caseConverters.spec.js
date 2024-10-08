import {
  camelToKebab,
  camelToSnake,
  kebabToCamel,
  kebabToSnake,
  objCamelToSnake,
  objSnakeToCamel,
  snakeToCamel,
  snakeToKebab,
} from '../caseConverters.js';

describe('Case converters', () => {
  it('Camel-Kebab', () => {
    const camelStr = 'camelToKebab';
    const kebabStr = 'camel-to-kebab';
    expect(camelToKebab(camelStr)).toBe(kebabStr);
    expect(kebabToCamel(kebabStr)).toBe(camelStr);
  });

  it('Snake-Kebab', () => {
    const snakeStr = 'snake_to_kebab';
    const kebabStr = 'snake-to-kebab';
    expect(snakeToKebab(snakeStr)).toBe(kebabStr);
    expect(kebabToSnake(kebabStr)).toBe(snakeStr);
  });

  it('Camel-Snake', () => {
    const camelStr = 'camelToSnake';
    const snakeStr = 'camel_to_snake';
    expect(camelToSnake(camelStr)).toBe(snakeStr);
    expect(snakeToCamel(snakeStr)).toBe(camelStr);
  });

  it('Camel-Snake, test case 1: do not convert 1st uppercase letter', () => {
    const camelStr = 'Timer';
    const snakeStr = 'Timer';
    expect(camelToSnake(camelStr)).toBe(snakeStr);
    expect(snakeToCamel(snakeStr)).toBe(camelStr);
  });

  it('Camel <- Snake skips first char "_"', () => {
    const camelStr = '_camelToSnake';
    const snakeStr = '_camel_to_snake';
    expect(snakeToCamel(snakeStr)).toBe(camelStr);
  });

  it('Camel-Snake Objects', () => {
    const camelObj = { camelToSnake: { camelToSnake: null, arr: [10] } };
    const snakeObj = { camel_to_snake: { camel_to_snake: null, arr: [10] } };
    expect(objCamelToSnake(camelObj)).toEqual(snakeObj);
    expect(objSnakeToCamel(snakeObj)).toEqual(camelObj);
  });

  it('Camel-Snake Objects: NULL VALUES', () => {
    const camelObj = null;
    const snakeObj = null;
    expect(objCamelToSnake(camelObj)).toEqual(snakeObj);
    expect(objSnakeToCamel(snakeObj)).toEqual(camelObj);
  });

  it('Camel-Snake Arrays', () => {
    const camelArr = ['camelToSnake', { camelToSnake: { camelToSnake: null } }];
    const snakeArr = ['camel_to_snake', { camel_to_snake: { camel_to_snake: null } }];
    expect(objCamelToSnake(camelArr)).toEqual(snakeArr);
    expect(objSnakeToCamel(snakeArr)).toEqual(camelArr);
  });

  it('Camel-to-Snake Object skips passed keys', () => {
    const skippedKeys = ['skippedKey'];
    const camelArr = { camelToSnake: null, skippedKey: null };
    const snakeArr = { camel_to_snake: null, skippedKey: null };
    expect(objCamelToSnake(camelArr, skippedKeys)).toEqual(snakeArr);
  });

  it('Snake-to-Camel Object skips passed keys', () => {
    const skippedKeys = ['skipped_key'];
    const camelArr = { camelToSnake: null, skipped_key: null };
    const snakeArr = { camel_to_snake: null, skipped_key: null };
    expect(objSnakeToCamel(snakeArr, skippedKeys)).toEqual(camelArr);
  });
});
