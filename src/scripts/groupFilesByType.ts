import type { EngineCallFile } from '@webitel/api-services/gen/models';

export const groupFilesByType = (files?: EngineCallFile[]) => {
	if (!files) return {};
	return files.reduce<Record<string, EngineCallFile[]>>((acc, file) => {
		const type = String(file.type);
		acc[type] = acc[type] || [];
		acc[type].push(file);
		return acc;
	}, {});
};
