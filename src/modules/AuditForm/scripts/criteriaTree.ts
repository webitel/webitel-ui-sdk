import type { EngineQuestion } from '@webitel/api-services/gen/models';
import { cloneDeep } from 'lodash-es';

export type AuditFormQuestionModel = EngineQuestion & {
	id: string;
	groupId?: string;
	position?: number;
};

export type AuditFormGroupModel = {
	id: string;
	name: string;
	position?: number;
};

export type AuditFormGroupItem = AuditFormGroupModel & {
	questions: AuditFormQuestionModel[];
};

export type AuditFormItem = AuditFormQuestionModel | AuditFormGroupItem;

export const isGroupItem = (item: AuditFormItem): item is AuditFormGroupItem =>
	'questions' in item;

export const toTree = (
	groups: AuditFormGroupModel[],
	questions: AuditFormQuestionModel[],
): AuditFormItem[] => {
	const groupIds = new Set(groups.map(({ id }) => id));
	const items: AuditFormItem[] = questions.filter(
		({ groupId }) => !groupIds.has(groupId ?? ''),
	);
	groups
		.toSorted((a, b) => (a.position ?? 0) - (b.position ?? 0))
		.forEach((group) => {
			items.splice(group.position ?? items.length, 0, {
				...group,
				questions: questions.filter(({ groupId }) => groupId === group.id),
			});
		});
	return items;
};

export const toWire = (items: AuditFormItem[]) => ({
	criteriaGroups: items.flatMap((item, position) =>
		isGroupItem(item)
			? [
					{
						id: item.id,
						name: item.name,
						position,
					},
				]
			: [],
	),
	questions: items
		.flatMap((item) =>
			isGroupItem(item)
				? item.questions.map((question) => ({
						...question,
						groupId: item.id,
					}))
				: [
						{
							...item,
							groupId: '',
						},
					],
		)
		.map((question, position) => ({
			...question,
			position,
		})),
});

export const cloneWithNewIds = (item: AuditFormItem): AuditFormItem =>
	isGroupItem(item)
		? {
				...item,
				id: crypto.randomUUID(),
				questions: item.questions.map((question) => ({
					...cloneDeep(question),
					id: crypto.randomUUID(),
				})),
			}
		: {
				...cloneDeep(item),
				id: crypto.randomUUID(),
			};
