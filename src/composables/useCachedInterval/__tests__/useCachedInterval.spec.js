import { useCachedInterval } from '../useCachedInterval';

describe('useCachedInterval', () => {
  it.skip('subscribe', async () => {
    const callback = vi.fn();
    const { subscribe } = useCachedInterval({ timeout: 10 });
    subscribe(callback);
    expect(callback).toHaveBeenCalledTimes(1);
    return await new Promise((resolve, reject) => setTimeout(() => {
      expect(callback).toHaveBeenCalledTimes(2);
      resolve();
    }, 10));
  });
});
