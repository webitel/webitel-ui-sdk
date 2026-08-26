/**
 * @description
 * Single source of truth moved to `@webitel/api-services/enums`, because the
 * queue Zod schema and the queue type defaults live there and api-services
 * cannot import from ui-sdk (the dependency runs the other way).
 *
 * Re-exported here so the ~40 `@webitel/ui-sdk/enums` consumers stay untouched.
 */
export {
	QueueType,
	QueueTypeName,
} from '@webitel/api-services/enums';
