/** Convert an arbitrary path segment (may contain spaces/mixed case) to kebab-case. */
export function slugify(segment: string): string {
	return String(segment)
		.trim()
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2') // camelCase -> camel-Case
		.replace(/[\s_]+/g, '-')
		.toLowerCase()
		.replace(/[^a-z0-9-]/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

/** Build the full CSS custom property name from a token path, e.g. ["WT","Buttons","Primary","background"] -> --wt-wt-buttons-primary-background */
export function toCssVarName(pathSegments: string[]): string {
	return `--wt-${pathSegments.map(slugify).join('-')}`;
}
