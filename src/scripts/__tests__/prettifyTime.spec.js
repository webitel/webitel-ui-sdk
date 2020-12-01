import prettifyTime from '../prettifyTime';

describe('prettifyTime', () => {
  it('prettifies date-format time', () => {
    const time = new Date(0);
    expect(prettifyTime(time)).toBe('03:00 AM');
  });

  it('prettifies number-format time', () => {
    const time = 0;
    expect(prettifyTime(time)).toBe('03:00 AM');
  });

  it('prettifies string-format time', () => {
    const time = '0';
    expect(prettifyTime(time)).toBe('03:00 AM');
  });
});
