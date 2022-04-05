import debounce from '../debounce';

describe('debounce', () => {
  it('debounces call', async () => {
    let isFnCalled = false;
    let fn = () => { isFnCalled = true; };
    fn = debounce(fn, 50);
    fn();
    expect(isFnCalled).toBeFalsy();
    await setTimeout(() => {
      expect(isFnCalled).toBeTruthy();
    }, 100);
  });
});
