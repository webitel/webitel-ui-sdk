import truncate from '../truncate';
import truncateFromEnd from '../truncateFromEnd';

describe('Truncate filters', () => {
  it('truncate', () => {
    const str = 'lorem ipsum dolor sit amet';
    expect(truncate(str)).toBe(`${str.slice(0, 15)}...`);
    expect(truncate(str, 3)).toBe('...');
    expect(truncate()).toBe('');
  });

  it('truncate from end', () => {
    const str = 'lorem ipsum dolor sit amet';
    expect(truncateFromEnd(str)).toBe(`...${str.slice(str.length - 15)}`);
    expect(truncateFromEnd(str, 3)).toBe('...');
    expect(truncateFromEnd()).toBe('');
  });
});
