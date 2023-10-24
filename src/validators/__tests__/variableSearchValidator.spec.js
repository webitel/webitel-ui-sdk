import variableSearchValidator from '../variableSearchValidator';

describe('Variable search validator', () => {
  it('Ordinary search', () => {
    const searchValue = 'height=100';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Search with spacing', () => {
   const searchValue = 'your height=5 feet 5½ inches (166 cm)';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Search with spacing', () => {
    const searchValue = 'height=5 feet 5½ inches (166 cm)';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Search with snake_case', () => {
    const searchValue = 'expected_output=valid_number';
    expect(variableSearchValidator(searchValue)).toBe(true);
  });
  it('Wrong search with spacing near "=" sign', () => {
    const searchValue = 'height= 100';
    expect(variableSearchValidator(searchValue)).toBe(false);
  });
  it('Wrong search with spacing near "=" sign', () => {
    const searchValue = 'height =100';
    expect(variableSearchValidator(searchValue)).toBe(false);
  });
  it('Wrong search with spacing near "=" sign', () => {
    const searchValue = 'height = 100';
    expect(variableSearchValidator(searchValue)).toBe(false);
  });
});
