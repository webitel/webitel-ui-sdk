import prettifyTime from '../prettifyTime.js';

describe('prettifyTime', () => {
  it('prettifies date-format time', () => {
    const time = new Date(0);
    expect(prettifyTime(time)).toBeTruthy();
  });

  it('prettifies number-format time', () => {
    const time = 0;
    expect(prettifyTime(time)).toBeTruthy();
  });

  it('prettifies string-format time', () => {
    const time = '0';
    expect(prettifyTime(time)).toBeTruthy();
  });
});
