/**
 * Schemas live in a package that has no access to the app's i18n, so a custom
 * rule carries the message key in the issue params instead of a message.
 * `configureZod` (`@webitel/ui-sdk/validations`) resolves it to
 * `validation.<key>` at parse time.
 *
 * Never pass `message` alongside it: an explicit message wins over the global
 * error map, and the raw key ends up in the ui.
 *
 * @example
 * z.number().refine((v) => v < 1440, i18nIssue('hourRange'))
 * ctx.addIssue({ code: 'custom', path: ['start'], ...i18nIssue('hourRange') })
 */
export const i18nIssue = (key: string) => ({
	params: {
		i18nKey: key,
	},
});
