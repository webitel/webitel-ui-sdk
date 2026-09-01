import type { EngineAuditRate } from '@webitel/api-services/gen/models';
import { getAuditFormService } from '../../../gen-wire';
import {
	applyTransform,
	camelToSnake,
	notify,
	snakeToCamel,
} from '../../transformers';
import { auditFormQuestionsResponseHandler } from './auditForms';

/**
 * Answers carry no timestamp of their own; the rate's is the one the UI shows.
 */
const fillAnswersCreatedAtFromRate = (rate: EngineAuditRate) => ({
	...rate,
	answers: (rate.answers ?? []).map((answer) => ({
		...answer,
		createdAt: rate.createdAt,
	})),
});

const responseTransformers = [
	snakeToCamel(),
	auditFormQuestionsResponseHandler,
	fillAnswersCreatedAtFromRate,
];

const getAuditRate = async (rateId: EngineAuditRate['id']) => {
	try {
		const response = await getAuditFormService().readAuditRate(String(rateId));
		return applyTransform(response.data, responseTransformers);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addAuditRate = async (itemInstance: EngineAuditRate) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
	]);
	try {
		const response = await getAuditFormService().createAuditFormRate(item);
		return applyTransform(response.data, responseTransformers);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateAuditRate = async ({
	itemId,
	itemInstance,
}: {
	itemId: EngineAuditRate['id'];
	itemInstance: EngineAuditRate;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
	]);
	try {
		const response = await getAuditFormService().updateAuditRate(
			String(itemId),
			item,
		);
		return applyTransform(response.data, responseTransformers);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteAuditRate = async (rateId: EngineAuditRate['id']) => {
	try {
		await getAuditFormService().deleteAuditRate(String(rateId));
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const AuditRatesAPI = {
	get: getAuditRate,
	add: addAuditRate,
	update: updateAuditRate,
	delete: deleteAuditRate,
};
