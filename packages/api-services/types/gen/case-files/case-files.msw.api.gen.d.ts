import { http } from 'msw';
import type { WebitelCasesCaseFileList, WebitelCasesFile } from '.././_models';
export declare const getListFilesResponseMock: (overrideResponse?: Partial<WebitelCasesCaseFileList>) => WebitelCasesCaseFileList;
export declare const getDeleteFileResponseMock: (overrideResponse?: Partial<WebitelCasesFile>) => WebitelCasesFile;
export declare const getListFilesMockHandler: (overrideResponse?: WebitelCasesCaseFileList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<WebitelCasesCaseFileList> | WebitelCasesCaseFileList)) => import("msw").HttpHandler;
export declare const getDeleteFileMockHandler: (overrideResponse?: WebitelCasesFile | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<WebitelCasesFile> | WebitelCasesFile)) => import("msw").HttpHandler;
export declare const getCaseFilesMock: () => import("msw").HttpHandler[];
