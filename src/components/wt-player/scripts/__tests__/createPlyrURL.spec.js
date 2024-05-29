import createPlyrURL from '../createPlyrURL.js';

describe('createPlyrURL', () => {
  it('baseURL equals to "/"', () => {
    const baseURL = '/';
    const iconURL = '/img/plyr.svg';
    expect(createPlyrURL(baseURL))
    .toBe(iconURL);
  });

  it('baseURL starts with "/"', () => {
    const baseURL = '/workspace';
    const iconURL = '/workspace/img/plyr.svg';
    expect(createPlyrURL(baseURL))
    .toBe(iconURL);
  });

  it('baseURL starts and ends with "/"', () => {
    const baseURL = '/workspace/';
    const iconURL = '/workspace/img/plyr.svg';
    expect(createPlyrURL(baseURL))
    .toBe(iconURL);
  });

  it('Empty baseURL', () => {
    const baseURL = '';
    const iconURL = '/img/plyr.svg';
    expect(createPlyrURL(baseURL))
    .toBe(iconURL);
  });
});
