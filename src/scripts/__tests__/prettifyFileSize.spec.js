import prettifyFileSize from '../prettifyFileSize';

describe('prettifyFileSize', () => {
  it('prettifies bytes to kb\'s', () => {
    const size = 1025;
    expect(prettifyFileSize(size)).toBe('1 Kb');
  });

  it('prettifies bytes to mb\'s', () => {
    const size = 1205 ** 2;
    expect(prettifyFileSize(size)).toBe('1.38 Mb');
  });

  it('handles 0 size', () => {
    const size = 0;
    expect(prettifyFileSize(size)).toBe('0');
  });
});
