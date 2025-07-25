/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { z as zod } from 'zod/v4';

/**
 * @summary Remove email address(es) of the contact.
 */
export const emailsDeleteEmailsParams = zod.object({
	contact_id: zod.string().describe('Contact ID associated with.'),
});

export const emailsDeleteEmailsQueryEtagItemRegExp = /^.+$/;

export const emailsDeleteEmailsQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Fields to be retrieved as a result.'),
	etag: zod
		.array(zod.string().regex(emailsDeleteEmailsQueryEtagItemRegExp))
		.describe('Set of unique ID(s) to remove.'),
});

export const emailsDeleteEmailsResponse = zod
	.object({
		data: zod
			.array(
				zod
					.object({
						createdAt: zod
							.string()
							.optional()
							.describe('The user who created this Field.'),
						createdBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						email: zod.string().optional().describe('The email address.'),
						etag: zod
							.string()
							.optional()
							.describe(
								'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
							),
						id: zod
							.string()
							.optional()
							.describe('The unique ID of the association. Never changes.'),
						primary: zod
							.boolean()
							.optional()
							.describe(
								'Indicates whether this phone number is default within other channels of the same type(phone).',
							),
						type: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						updatedAt: zod
							.string()
							.optional()
							.describe(
								'Timestamp(milli) of the last Field update.\nTake part in Etag generation.',
							),
						updatedBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						ver: zod
							.number()
							.optional()
							.describe('Version of the latest update. Numeric sequence.'),
						verified: zod.boolean().optional(),
					})
					.describe("The Contact's email address."),
			)
			.optional()
			.describe('EmailAddress dataset page.'),
		next: zod.boolean().optional(),
		page: zod
			.number()
			.optional()
			.describe('The page number of the partial result.'),
	})
	.describe('Email dataset.');

/**
 * @summary Locates email address(es) of the contact.
 */
export const emailsListEmailsParams = zod.object({
	contact_id: zod.string().describe('The Contact ID linked with.'),
});

export const emailsListEmailsQueryParams = zod.object({
	page: zod
		.number()
		.optional()
		.describe('Page number of result dataset records. offset = (page*size)'),
	size: zod
		.number()
		.optional()
		.describe('Size count of records on result page. limit = (size++)'),
	q: zod
		.string()
		.optional()
		.describe(
			'Search term: email address.\n`?` - matches any one character\n`*` - matches 0 or more characters',
		),
	sort: zod
		.array(zod.string())
		.optional()
		.describe('Sort the result according to fields.'),
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Fields to be retrieved into result.'),
	id: zod
		.array(zod.string())
		.optional()
		.describe('Link(s) with unique ID only.'),
	primary: zod.boolean().optional().describe('Primary email address only.'),
	verified: zod.boolean().optional().describe('Verified email addresses only.'),
	typeId: zod.string().optional().describe('Reference Object unique ID.'),
	typeType: zod
		.string()
		.optional()
		.describe('Reference Object well-known type.'),
	typeName: zod.string().optional().describe('Reference Object display name.'),
});

export const emailsListEmailsResponse = zod
	.object({
		data: zod
			.array(
				zod
					.object({
						createdAt: zod
							.string()
							.optional()
							.describe('The user who created this Field.'),
						createdBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						email: zod.string().optional().describe('The email address.'),
						etag: zod
							.string()
							.optional()
							.describe(
								'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
							),
						id: zod
							.string()
							.optional()
							.describe('The unique ID of the association. Never changes.'),
						primary: zod
							.boolean()
							.optional()
							.describe(
								'Indicates whether this phone number is default within other channels of the same type(phone).',
							),
						type: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						updatedAt: zod
							.string()
							.optional()
							.describe(
								'Timestamp(milli) of the last Field update.\nTake part in Etag generation.',
							),
						updatedBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						ver: zod
							.number()
							.optional()
							.describe('Version of the latest update. Numeric sequence.'),
						verified: zod.boolean().optional(),
					})
					.describe("The Contact's email address."),
			)
			.optional()
			.describe('EmailAddress dataset page.'),
		next: zod.boolean().optional(),
		page: zod
			.number()
			.optional()
			.describe('The page number of the partial result.'),
	})
	.describe('Email dataset.');

/**
 * @summary Update or append email address(es) of the contact.
 */
export const emailsMergeEmailsParams = zod.object({
	contact_id: zod.string().describe('Link contact ID.'),
});

export const emailsMergeEmailsQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Fields to be retrieved into result of changes.'),
});

export const emailsMergeEmailsBodyItem = zod
	.object({
		email: zod.string().describe('The email address.'),
		etag: zod
			.string()
			.optional()
			.describe('Unique ID of the latest version of an existing resorce.'),
		primary: zod
			.boolean()
			.optional()
			.describe(
				'Indicates whether this phone number is default within other channels of the same type(phone).',
			),
		type: zod
			.object({
				id: zod.string().optional().describe('Reference Object unique ID.'),
				name: zod
					.string()
					.optional()
					.describe('Reference Object display name.'),
				type: zod
					.string()
					.optional()
					.describe('Reference Object well-known type.'),
			})
			.optional()
			.describe(
				'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
			),
		verified: zod.boolean().optional(),
	})
	.describe("Input of the Contact's email address.");
export const emailsMergeEmailsBody = zod.array(emailsMergeEmailsBodyItem);

export const emailsMergeEmailsResponse = zod
	.object({
		data: zod
			.array(
				zod
					.object({
						createdAt: zod
							.string()
							.optional()
							.describe('The user who created this Field.'),
						createdBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						email: zod.string().optional().describe('The email address.'),
						etag: zod
							.string()
							.optional()
							.describe(
								'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
							),
						id: zod
							.string()
							.optional()
							.describe('The unique ID of the association. Never changes.'),
						primary: zod
							.boolean()
							.optional()
							.describe(
								'Indicates whether this phone number is default within other channels of the same type(phone).',
							),
						type: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						updatedAt: zod
							.string()
							.optional()
							.describe(
								'Timestamp(milli) of the last Field update.\nTake part in Etag generation.',
							),
						updatedBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						ver: zod
							.number()
							.optional()
							.describe('Version of the latest update. Numeric sequence.'),
						verified: zod.boolean().optional(),
					})
					.describe("The Contact's email address."),
			)
			.optional()
			.describe('EmailAddress dataset page.'),
		next: zod.boolean().optional(),
		page: zod
			.number()
			.optional()
			.describe('The page number of the partial result.'),
	})
	.describe('Email dataset.');

/**
 * @summary Resets all emails of the contact according to the input dataset.
 */
export const emailsResetEmailsParams = zod.object({
	contact_id: zod.string().describe('Link contact ID.'),
});

export const emailsResetEmailsQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Fields to be retrieved into result of changes.'),
});

export const emailsResetEmailsBodyItem = zod
	.object({
		email: zod.string().describe('The email address.'),
		etag: zod
			.string()
			.optional()
			.describe('Unique ID of the latest version of an existing resorce.'),
		primary: zod
			.boolean()
			.optional()
			.describe(
				'Indicates whether this phone number is default within other channels of the same type(phone).',
			),
		type: zod
			.object({
				id: zod.string().optional().describe('Reference Object unique ID.'),
				name: zod
					.string()
					.optional()
					.describe('Reference Object display name.'),
				type: zod
					.string()
					.optional()
					.describe('Reference Object well-known type.'),
			})
			.optional()
			.describe(
				'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
			),
		verified: zod.boolean().optional(),
	})
	.describe("Input of the Contact's email address.");
export const emailsResetEmailsBody = zod
	.array(emailsResetEmailsBodyItem)
	.min(1);

export const emailsResetEmailsResponse = zod
	.object({
		data: zod
			.array(
				zod
					.object({
						createdAt: zod
							.string()
							.optional()
							.describe('The user who created this Field.'),
						createdBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						email: zod.string().optional().describe('The email address.'),
						etag: zod
							.string()
							.optional()
							.describe(
								'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
							),
						id: zod
							.string()
							.optional()
							.describe('The unique ID of the association. Never changes.'),
						primary: zod
							.boolean()
							.optional()
							.describe(
								'Indicates whether this phone number is default within other channels of the same type(phone).',
							),
						type: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						updatedAt: zod
							.string()
							.optional()
							.describe(
								'Timestamp(milli) of the last Field update.\nTake part in Etag generation.',
							),
						updatedBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						ver: zod
							.number()
							.optional()
							.describe('Version of the latest update. Numeric sequence.'),
						verified: zod.boolean().optional(),
					})
					.describe("The Contact's email address."),
			)
			.optional()
			.describe('EmailAddress dataset page.'),
		next: zod.boolean().optional(),
		page: zod
			.number()
			.optional()
			.describe('The page number of the partial result.'),
	})
	.describe('Email dataset.');

/**
 * @summary Remove the contact's email address link
 */
export const emailsDeleteEmailParams = zod.object({
	contact_id: zod.string().describe('Contact ID associated with.'),
	etag: zod.string().describe('Unique ID to remove.'),
});

export const emailsDeleteEmailQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Fields to be retrieved as a result.'),
});

export const emailsDeleteEmailResponse = zod
	.object({
		createdAt: zod
			.string()
			.optional()
			.describe('The user who created this Field.'),
		createdBy: zod
			.object({
				id: zod.string().optional().describe('Reference Object unique ID.'),
				name: zod
					.string()
					.optional()
					.describe('Reference Object display name.'),
				type: zod
					.string()
					.optional()
					.describe('Reference Object well-known type.'),
			})
			.optional()
			.describe(
				'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
			),
		email: zod.string().optional().describe('The email address.'),
		etag: zod
			.string()
			.optional()
			.describe(
				'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
			),
		id: zod
			.string()
			.optional()
			.describe('The unique ID of the association. Never changes.'),
		primary: zod
			.boolean()
			.optional()
			.describe(
				'Indicates whether this phone number is default within other channels of the same type(phone).',
			),
		type: zod
			.object({
				id: zod.string().optional().describe('Reference Object unique ID.'),
				name: zod
					.string()
					.optional()
					.describe('Reference Object display name.'),
				type: zod
					.string()
					.optional()
					.describe('Reference Object well-known type.'),
			})
			.optional()
			.describe(
				'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
			),
		updatedAt: zod
			.string()
			.optional()
			.describe(
				'Timestamp(milli) of the last Field update.\nTake part in Etag generation.',
			),
		updatedBy: zod
			.object({
				id: zod.string().optional().describe('Reference Object unique ID.'),
				name: zod
					.string()
					.optional()
					.describe('Reference Object display name.'),
				type: zod
					.string()
					.optional()
					.describe('Reference Object well-known type.'),
			})
			.optional()
			.describe(
				'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
			),
		ver: zod
			.number()
			.optional()
			.describe('Version of the latest update. Numeric sequence.'),
		verified: zod.boolean().optional(),
	})
	.describe("The Contact's email address.");

/**
 * @summary Locate the email address link.
 */
export const emailsLocateEmailParams = zod.object({
	contact_id: zod.string().describe('Contact source ID.'),
	etag: zod
		.string()
		.describe(
			'Unique mail address link IDentifier.\nAccept: `etag` (obsolete+) or `id`.',
		),
});

export const emailsLocateEmailQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Fields to be retrieved into result.'),
});

export const emailsLocateEmailResponse = zod
	.object({
		createdAt: zod
			.string()
			.optional()
			.describe('The user who created this Field.'),
		createdBy: zod
			.object({
				id: zod.string().optional().describe('Reference Object unique ID.'),
				name: zod
					.string()
					.optional()
					.describe('Reference Object display name.'),
				type: zod
					.string()
					.optional()
					.describe('Reference Object well-known type.'),
			})
			.optional()
			.describe(
				'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
			),
		email: zod.string().optional().describe('The email address.'),
		etag: zod
			.string()
			.optional()
			.describe(
				'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
			),
		id: zod
			.string()
			.optional()
			.describe('The unique ID of the association. Never changes.'),
		primary: zod
			.boolean()
			.optional()
			.describe(
				'Indicates whether this phone number is default within other channels of the same type(phone).',
			),
		type: zod
			.object({
				id: zod.string().optional().describe('Reference Object unique ID.'),
				name: zod
					.string()
					.optional()
					.describe('Reference Object display name.'),
				type: zod
					.string()
					.optional()
					.describe('Reference Object well-known type.'),
			})
			.optional()
			.describe(
				'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
			),
		updatedAt: zod
			.string()
			.optional()
			.describe(
				'Timestamp(milli) of the last Field update.\nTake part in Etag generation.',
			),
		updatedBy: zod
			.object({
				id: zod.string().optional().describe('Reference Object unique ID.'),
				name: zod
					.string()
					.optional()
					.describe('Reference Object display name.'),
				type: zod
					.string()
					.optional()
					.describe('Reference Object well-known type.'),
			})
			.optional()
			.describe(
				'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
			),
		ver: zod
			.number()
			.optional()
			.describe('Version of the latest update. Numeric sequence.'),
		verified: zod.boolean().optional(),
	})
	.describe("The Contact's email address.");

/**
 * @summary Update the contact's email address link details
 */
export const emailsUpdateEmail2Params = zod.object({
	contact_id: zod.string().describe('Link contact ID.'),
	etag: zod
		.string()
		.describe('Unique ID of the latest version of an existing resorce.'),
});

export const emailsUpdateEmail2QueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Fields to be retrieved into result of changes.'),
});

export const emailsUpdateEmail2Body = zod.object({
	email: zod.string().describe('The email address.'),
	primary: zod
		.boolean()
		.optional()
		.describe(
			'Indicates whether this phone number is default within other channels of the same type(phone).',
		),
	type: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	verified: zod.boolean().optional(),
});

export const emailsUpdateEmail2Response = zod
	.object({
		data: zod
			.array(
				zod
					.object({
						createdAt: zod
							.string()
							.optional()
							.describe('The user who created this Field.'),
						createdBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						email: zod.string().optional().describe('The email address.'),
						etag: zod
							.string()
							.optional()
							.describe(
								'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
							),
						id: zod
							.string()
							.optional()
							.describe('The unique ID of the association. Never changes.'),
						primary: zod
							.boolean()
							.optional()
							.describe(
								'Indicates whether this phone number is default within other channels of the same type(phone).',
							),
						type: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						updatedAt: zod
							.string()
							.optional()
							.describe(
								'Timestamp(milli) of the last Field update.\nTake part in Etag generation.',
							),
						updatedBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						ver: zod
							.number()
							.optional()
							.describe('Version of the latest update. Numeric sequence.'),
						verified: zod.boolean().optional(),
					})
					.describe("The Contact's email address."),
			)
			.optional()
			.describe('EmailAddress dataset page.'),
		next: zod.boolean().optional(),
		page: zod
			.number()
			.optional()
			.describe('The page number of the partial result.'),
	})
	.describe('Email dataset.');

/**
 * @summary Update the contact's email address link details
 */
export const emailsUpdateEmailParams = zod.object({
	contact_id: zod.string().describe('Link contact ID.'),
	etag: zod
		.string()
		.describe('Unique ID of the latest version of an existing resorce.'),
});

export const emailsUpdateEmailQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Fields to be retrieved into result of changes.'),
});

export const emailsUpdateEmailBody = zod.object({
	email: zod.string().describe('The email address.'),
	primary: zod
		.boolean()
		.optional()
		.describe(
			'Indicates whether this phone number is default within other channels of the same type(phone).',
		),
	type: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	verified: zod.boolean().optional(),
});

export const emailsUpdateEmailResponse = zod
	.object({
		data: zod
			.array(
				zod
					.object({
						createdAt: zod
							.string()
							.optional()
							.describe('The user who created this Field.'),
						createdBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						email: zod.string().optional().describe('The email address.'),
						etag: zod
							.string()
							.optional()
							.describe(
								'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
							),
						id: zod
							.string()
							.optional()
							.describe('The unique ID of the association. Never changes.'),
						primary: zod
							.boolean()
							.optional()
							.describe(
								'Indicates whether this phone number is default within other channels of the same type(phone).',
							),
						type: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						updatedAt: zod
							.string()
							.optional()
							.describe(
								'Timestamp(milli) of the last Field update.\nTake part in Etag generation.',
							),
						updatedBy: zod
							.object({
								id: zod
									.string()
									.optional()
									.describe('Reference Object unique ID.'),
								name: zod
									.string()
									.optional()
									.describe('Reference Object display name.'),
								type: zod
									.string()
									.optional()
									.describe('Reference Object well-known type.'),
							})
							.optional()
							.describe(
								'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
							),
						ver: zod
							.number()
							.optional()
							.describe('Version of the latest update. Numeric sequence.'),
						verified: zod.boolean().optional(),
					})
					.describe("The Contact's email address."),
			)
			.optional()
			.describe('EmailAddress dataset page.'),
		next: zod.boolean().optional(),
		page: zod
			.number()
			.optional()
			.describe('The page number of the partial result.'),
	})
	.describe('Email dataset.');
