import {
  camelToKebab,
  camelToSnake,
  kebabToCamel,
  objCamelToSnake,
  objSnakeToCamel,
  snakeToCamel,
} from '../caseConverters';

describe('Case converters', () => {
  it('Camel-Kebab', () => {
    const camelStr = 'camelToKebab';
    const kebabStr = 'camel-to-kebab';
    expect(camelToKebab(camelStr)).toBe(kebabStr);
    expect(kebabToCamel(kebabStr)).toBe(camelStr);
  });

  it('Camel-Snake', () => {
    const camelStr = 'camelToSnake';
    const snakeStr = 'camel_to_snake';
    expect(camelToSnake(camelStr)).toBe(snakeStr);
    expect(snakeToCamel(snakeStr)).toBe(camelStr);
  });

  it('Camel-Snake Objects', () => {
    const camelObj = { camelToSnake: { camelToSnake: null } };
    const snakeObj = { camel_to_snake: { camel_to_snake: null } };
    expect(objCamelToSnake(camelObj)).toEqual(snakeObj);
    expect(objSnakeToCamel(snakeObj)).toEqual(camelObj);
  });

  it('Camel-Snake Arrays', () => {
    const camelArr = ['camelToSnake', { camelToSnake: { camelToSnake: null } }];
    const snakeArr = ['camel_to_snake', { camel_to_snake: { camel_to_snake: null } }];
    expect(objCamelToSnake(camelArr)).toEqual(snakeArr);
    expect(objSnakeToCamel(snakeArr)).toEqual(camelArr);
  });
});
