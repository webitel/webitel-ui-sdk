import type { AuditFormGroupItem } from '../scripts/criteriaTree';

export const generateGroupSchema = (): AuditFormGroupItem => ({
	id: crypto.randomUUID(),
	name: '',
	questions: [],
});
