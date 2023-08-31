import { useCachedInterval } from '../useCachedInterval';

describe('useCachedInterval', () => {
  it('subscribe', (done) => {
    const callback = jest.fn();
    const { subscribe } = useCachedInterval({ timeout: 10 });
    subscribe(callback);
    expect(callback).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(callback).toHaveBeenCalledTimes(2);
      done();
    }, 10);
  });
});
