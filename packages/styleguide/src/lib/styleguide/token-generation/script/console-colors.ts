/** Minimal, dependency-free ANSI colorizers for console output. Disabled automatically
 * when stderr isn't a TTY or NO_COLOR is set, so piped/CI output stays plain text. */
const colorsEnabled = process.stderr.isTTY && !process.env.NO_COLOR;

function wrap(code: string): (text: string) => string {
	return (text: string) =>
		colorsEnabled ? `\x1b[${code}m${text}\x1b[0m` : text;
}

export const red = wrap('31');
export const yellow = wrap('33');
export const bold = wrap('1');
