import { SkillServiceApiFactory } from 'webitel-sdk';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const skillService = SkillServiceApiFactory(configuration, '', instance);

const getSkillsList = async (params) => {
	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await skillService.searchSkill(
			page,
			size,
			search,
			sort,
			fields,
			id,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getSkill = async ({ itemId: id }) => {
	try {
		const response = await skillService.readSkill(id);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const fieldsToSend = ['name', 'description'];

const addSkill = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await skillService.createSkill(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updateSkill = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await skillService.updateSkill(id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteSkill = async ({ id }) => {
	try {
		const response = await skillService.deleteSkill(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getSkillsLookup = (params) =>
	getSkillsList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

export const SkillsAPI = {
	getList: getSkillsList,
	get: getSkill,
	add: addSkill,
	update: updateSkill,
	delete: deleteSkill,
	getLookup: getSkillsLookup,
};
