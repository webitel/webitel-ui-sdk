import preventHiddenPageCallsDecorator
  from '../preventHiddenPageCallsDecorator.js';

describe('preventHiddenPageCallsDecorator', () => {
  it('prevents call on hidden page', () => {
    let isFnCalled = false;
    let fn = () => { isFnCalled = true; };
    fn = preventHiddenPageCallsDecorator(fn, 50);
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get() { return true; },
    });
    expect(isFnCalled).toBeFalsy();
    fn();
    expect(isFnCalled).toBeFalsy();
  });
});
