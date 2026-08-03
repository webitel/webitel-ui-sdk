import type {
	ContactsManager,
	ContactsTimezone,
	WebitelContactsContact,
	WebitelContactsLabel,
	WebitelContactsLookup,
} from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

/**
 * `ContactsAPI` (api/clients/contacts/contacts.ts) unwraps the generated
 * `WebitelContactsContact`'s paginated `{data:[...]}` envelopes for these
 * fields into plain arrays (and `name` into a plain string) on read, and
 * wraps them back on write. This type reflects that actual runtime shape.
 */
export interface Contact
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

export const contactSchema = z.object<ZodShape<Contact>>({
	name: z.string().optional(),
	timezones: z.array(z.any()).optional(),
	managers: z.array(z.any()).optional(),
	groups: z.array(z.any()).optional(),
	labels: z.array(z.any()).optional(),
	about: z.string().nullish(),
	user: z.any().nullish(),
});
