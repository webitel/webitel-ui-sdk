import convertDuration from '../convertDuration.js';

describe('Case converters', () => {
  it('duration from sec value', () => {
    const time = 111;
    const duration = '00:01:51';
    expect(convertDuration(time)).toBe(duration);
  });

  it('duration from sec string value', () => {
    const time = '61';
    const duration = '00:01:01';
    expect(convertDuration(time)).toBe(duration);
  });

  it('duration from false value', () => {
    const time = null;
    const duration = '00:00:00';
    expect(convertDuration(time)).toBe(duration);
  });
});
