import { http } from 'msw';
import type { CasesCaseFileList, CasesFile } from '.././_models';
export declare const getListFilesResponseMock: (overrideResponse?: Partial<CasesCaseFileList>) => CasesCaseFileList;
export declare const getDeleteFileResponseMock: (overrideResponse?: Partial<CasesFile>) => CasesFile;
export declare const getListFilesMockHandler: (overrideResponse?: CasesCaseFileList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<CasesCaseFileList> | CasesCaseFileList)) => import("msw").HttpHandler;
export declare const getDeleteFileMockHandler: (overrideResponse?: CasesFile | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<CasesFile> | CasesFile)) => import("msw").HttpHandler;
export declare const getCaseFilesMock: () => import("msw").HttpHandler[];
