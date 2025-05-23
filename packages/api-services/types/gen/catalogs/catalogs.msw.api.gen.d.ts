import { http } from 'msw';
import type { CasesCatalog, CasesCatalogList, CasesLocateCatalogResponse } from '.././_models';
export declare const getListCatalogsResponseMock: (overrideResponse?: Partial<CasesCatalogList>) => CasesCatalogList;
export declare const getCreateCatalogResponseMock: (overrideResponse?: Partial<CasesCatalog>) => CasesCatalog;
export declare const getDeleteCatalogResponseMock: (overrideResponse?: Partial<CasesCatalogList>) => CasesCatalogList;
export declare const getLocateCatalogResponseMock: (overrideResponse?: Partial<CasesLocateCatalogResponse>) => CasesLocateCatalogResponse;
export declare const getUpdateCatalog2ResponseMock: (overrideResponse?: Partial<CasesCatalog>) => CasesCatalog;
export declare const getUpdateCatalogResponseMock: (overrideResponse?: Partial<CasesCatalog>) => CasesCatalog;
export declare const getListCatalogsMockHandler: (overrideResponse?: CasesCatalogList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<CasesCatalogList> | CasesCatalogList)) => import("msw").HttpHandler;
export declare const getCreateCatalogMockHandler: (overrideResponse?: CasesCatalog | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<CasesCatalog> | CasesCatalog)) => import("msw").HttpHandler;
export declare const getDeleteCatalogMockHandler: (overrideResponse?: CasesCatalogList | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<CasesCatalogList> | CasesCatalogList)) => import("msw").HttpHandler;
export declare const getLocateCatalogMockHandler: (overrideResponse?: CasesLocateCatalogResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<CasesLocateCatalogResponse> | CasesLocateCatalogResponse)) => import("msw").HttpHandler;
export declare const getUpdateCatalog2MockHandler: (overrideResponse?: CasesCatalog | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<CasesCatalog> | CasesCatalog)) => import("msw").HttpHandler;
export declare const getUpdateCatalogMockHandler: (overrideResponse?: CasesCatalog | ((info: Parameters<Parameters<typeof http.put>[1]>[0]) => Promise<CasesCatalog> | CasesCatalog)) => import("msw").HttpHandler;
export declare const getCatalogsMock: () => import("msw").HttpHandler[];
