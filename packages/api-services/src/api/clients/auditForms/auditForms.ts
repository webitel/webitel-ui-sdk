import {
	CreateAuditFormBody,
	getAuditFormService,
	PatchAuditFormBody,
	SearchAuditFormQueryParams,
	UpdateAuditFormBody,
} from '@webitel/api-services/gen';
import { EngineAuditQuestionType } from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
	translateError,
} from '../../transformers';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const itemResponseHandler = (response: ApiParams) => ({
	...response,
	questions:
		response.questions?.map((question: ApiParams) => {
			if (question.type === EngineAuditQuestionType.QuestionScore) {
				return {
					...question,
					max: question.max || 1,
					min: question.min || 0,
					required: question.required || false,
					question: question.question || '',
				};
			}
			if (question.type === EngineAuditQuestionType.QuestionOption) {
				return {
					...question,
					options:
						question.options?.map((option: ApiParams) => ({
							...option,
							name: option.name || '',
							score: option.score || 0,
						})) || [],
				};
			}
			return question;
		}) || [],
});

const getAuditFormsList = async (params: ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchAuditFormQueryParams,
	);

	const transformedParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params?.q || params?.search,
		}),
		starToSearch('q'),
		starToSearch('question'),
		(params) => ({
			...params,
			fields: [
				'id',
				'editable',
				...(params?.fields || []),
			],
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response =
			await getAuditFormService().searchAuditForm(transformedParams);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			translateError,
			notify,
		]);
	}
};

const getAuditForm = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getAuditFormService().readAuditForm(Number(id));
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			translateError,
			notify,
		]);
	}
};

const getLookup = (params: Parameters<typeof getAuditFormsList>[0]) =>
	getAuditFormsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const createAuditForm = async ({ itemInstance }: AddItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(CreateAuditFormBody);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getAuditFormService().createAuditForm(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			translateError,
			notify,
		]);
	}
};

const updateAuditForm = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateAuditFormBody);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getAuditFormService().updateAuditForm(
			Number(id),
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			translateError,
			notify,
		]);
	}
};

const patchAuditForm = async ({ changes, id }: PatchItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(PatchAuditFormBody);

	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getAuditFormService().patchAuditForm(
			Number(id),
			body,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			translateError,
			notify,
		]);
	}
};

const deleteAuditForm = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getAuditFormService().deleteAuditForm(Number(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			translateError,
			notify,
		]);
	}
};

export const AuditFormsAPI = {
	getList: getAuditFormsList,
	get: getAuditForm,
	getLookup,
	add: createAuditForm,
	update: updateAuditForm,
	patch: patchAuditForm,
	delete: deleteAuditForm,
};
