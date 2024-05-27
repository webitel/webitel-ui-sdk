import variableSearchValidator from '../variableSearchValidator.js';

describe('Variable search validator', () => {
  it('Ordinary search', () => {
    const searchValue = 'height=100';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Search with spacing in value and key', () => {
    const searchValue = 'your height=5 feet 5½ inches (166 cm)';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Search with spacing in value', () => {
    const searchValue = 'height=5 feet 5½ inches (166 cm)';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Search with spacing in value and spaces before key and after value', () => {
    const searchValue = ' height=5 feet 5½ inches (166 cm) ';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Search with snake_case', () => {
    const searchValue = 'expected_output=valid_number';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Wrong search with spacing after "=" sign', () => {
    const searchValue = 'height= 100';
    expect(variableSearchValidator(searchValue)).toBe(false);
  });
  it('Wrong search with spacing before "=" sign', () => {
    const searchValue = 'height =100';
    expect(variableSearchValidator(searchValue)).toBe(false);
  });
  it('Wrong search with spacing near "=" sign', () => {
    const searchValue = 'height = 100';
    expect(variableSearchValidator(searchValue)).toBe(false);
  });
  it('Space search', () => {
    const searchValue = ' ';
    expect(variableSearchValidator(searchValue)).toBe(false);
  });
  it('Empty search', () => {
    const searchValue = '';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Multiple "=" search', () => {
    const searchValue = 'height=5 feet 5½ inches (166 cm), age=1231, fin=123231';
    expect(variableSearchValidator(searchValue)).toBe(false);
  });
});
