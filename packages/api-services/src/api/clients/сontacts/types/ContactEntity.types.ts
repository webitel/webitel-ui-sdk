import type {
	ContactsManager,
	ContactsTimezone,
	WebitelContactsContact,
	WebitelContactsLabel,
	WebitelContactsLookup,
} from '@webitel/api-services/gen/models';

/**
 * `ContactsAPI` (../contacts.ts) unwraps the generated `WebitelContactsContact`'s
 * paginated `{data:[...]}` envelopes for these fields into plain arrays (and
 * `name` into a plain string) on read, and wraps them back on write. This type
 * reflects that actual runtime shape.
 */
export interface ContactEntity
	extends Omit<
		WebitelContactsContact,
		'name' | 'timezones' | 'managers' | 'labels' | 'groups'
	> {
	name?: string;
	timezones?: ContactsTimezone[];
	managers?: ContactsManager[];
	labels?: WebitelContactsLabel[];
	groups?: WebitelContactsLookup[];
}
