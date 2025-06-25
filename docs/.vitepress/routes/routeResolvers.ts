import { globbySync } from 'globby';
import path from 'path';

const baseUrl = 'pages';
const basePkgUrl = 'packages';
const baseKnowledgeBaseUrl = 'knowledge-base';

export type DocPkg = 'ui-sdk' | 'api-services' | 'ui-datalist';

const resolveByPattern = (patterns: string | string[]) => {
    return globbySync(patterns, { cwd: path.resolve(__dirname, `../../${baseUrl}/`) });
};

export const resolvePkgLinkDoc = (pkg: DocPkg) => (path: string) => {
    return `${baseUrl}/${basePkgUrl}/${pkg}/${path}`;
};

export const resolveKnowledgeBaseLinkDoc = (path: string) => {
    return `${baseUrl}/${baseKnowledgeBaseUrl}/${path}`;
};

export const resolvePkgDocItems = (pkg: DocPkg) => (patterns: string | string[]) => {
    const patternsArr = Array.isArray(patterns) ? patterns : [patterns];

    const pkgPatterns = patternsArr.map((pattern) => {
        return `${basePkgUrl}/${pkg}/${pattern}`;
    });

    return resolveByPattern(pkgPatterns);
};

export const resolveKnowledgeBaseDocItems = (patterns: string | string[]) => {
    const patternsArr = Array.isArray(patterns) ? patterns : [patterns];

    const knowledgeBasePatterns = patternsArr.map((pattern) => {
        return `${baseKnowledgeBaseUrl}/${pattern}`;
    });

    return resolveByPattern(knowledgeBasePatterns);
};