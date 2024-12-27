import BaseStoreModule from '../BaseStoreModule.js';

const APIModule = {
  getList: vi.fn(),
  get: vi.fn(),
  add: vi.fn(),
  update: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
};

describe('Base Store Module', () => {
  let module;
  beforeEach(() => {
    module = new BaseStoreModule();
  });
  it('attaches api module and generates API actions from it', () => {
    const _module = module
      .attachAPIModule(APIModule)
      .generateAPIActions()
      .getModule();
    expect(_module.actions.GET_LIST).toBeTruthy();
    expect(_module.actions.GET_ITEM).toBeTruthy();
    expect(_module.actions.POST_ITEM).toBeTruthy();
    expect(_module.actions.PATCH_ITEM).toBeTruthy();
    expect(_module.actions.UPD_ITEM).toBeTruthy();
    expect(_module.actions.DELETE_ITEM).toBeTruthy();
  });
  it('generated GET_LIST correctly gets passed params', () => {
    const state = { jest: 'jest' };
    const params = { jest2: 'jest1' };
    const context = { state };
    const expectedParams = { jest: 'jest', jest2: 'jest1' };
    const _module = module
      .attachAPIModule(APIModule)
      .generateAPIActions()
      .getModule();
    _module.actions.GET_LIST(context, params);
    expect(APIModule.getList).toHaveBeenCalledWith(expectedParams);
  });
  it('generated GET_ITEM correctly gets passed params', () => {
    const state = { jest: 'jest' };
    const params = { jest2: 'jest1' };
    const context = { state };
    const expectedParams = { jest: 'jest', jest2: 'jest1' };
    const _module = module
      .attachAPIModule(APIModule)
      .generateAPIActions()
      .getModule();
    _module.actions.GET_ITEM(context, params);
    expect(APIModule.get).toHaveBeenCalledWith(expectedParams);
  });
  it('generated POST_ITEM correctly gets passed params', () => {
    const state = { jest: 'jest' };
    const context = { state };
    const expectedParams = { jest: 'jest' };
    const _module = module
      .attachAPIModule(APIModule)
      .generateAPIActions()
      .getModule();
    _module.actions.POST_ITEM(context);
    expect(APIModule.add).toHaveBeenCalledWith(expectedParams);
  });
  it('generated PATCH_ITEM correctly gets passed params', () => {
    const state = { jest: 'jest' };
    const params = { id: '1', changes: { jest: 'my change!' } };
    const context = { state };
    const expectedParams = {
      jest: 'jest',
      id: '1',
      changes: { jest: 'my change!' },
    };
    const _module = module
      .attachAPIModule(APIModule)
      .generateAPIActions()
      .getModule();
    _module.actions.PATCH_ITEM(context, params);
    expect(APIModule.patch).toHaveBeenCalledWith(expectedParams);
  });
  it('generated UPD_ITEM correctly gets passed params', () => {
    const state = { jest: 'jest' };
    const context = { state };
    const expectedParams = { jest: 'jest' };
    const _module = module
      .attachAPIModule(APIModule)
      .generateAPIActions()
      .getModule();
    _module.actions.UPD_ITEM(context);
    expect(APIModule.update).toHaveBeenCalledWith(expectedParams);
  });
  it('generated DELETE_ITEM correctly gets passed params', () => {
    const state = { jest: 'jest' };
    const params = '1';
    const context = { state };
    const expectedParams = { jest: 'jest', id: '1' };
    const _module = module
      .attachAPIModule(APIModule)
      .generateAPIActions()
      .getModule();
    _module.actions.DELETE_ITEM(context, params);
    expect(APIModule.delete).toHaveBeenCalledWith(expectedParams);
  });
  it('sets child modules', () => {
    const jest = { state: 'jest' };
    const _module = module.setChildModules({ jest }).getModule();
    expect(_module.modules).toEqual({ jest });
  });
});
