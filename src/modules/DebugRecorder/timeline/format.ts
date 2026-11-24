// times, durations and short one-line renderings shared by the event descriptions
export type Data = Record<string, unknown>;

export type Stat = Record<string, unknown> & {
	type?: string;
	id?: string;
};

export interface Line {
	text: string;
	problem?: boolean;
}

export const MAX_INLINE = 300;

export const pad2 = (n: number) => String(n).padStart(2, '0');

export function clock(t: number): string {
	const d = new Date(t);
	return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.${String(d.getMilliseconds()).padStart(3, '0')}`;
}

export function day(t: number): string {
	const d = new Date(t);
	return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function utcOffset(t: number): string {
	const minutes = -new Date(t).getTimezoneOffset();
	const sign = minutes >= 0 ? '+' : '-';
	const abs = Math.abs(minutes);
	return `UTC${sign}${pad2(Math.floor(abs / 60))}:${pad2(abs % 60)}`;
}

export function duration(ms: number): string {
	if (ms < 1_000) return `${Math.round(ms)} ms`;
	if (ms < 60_000) return `${(ms / 1_000).toFixed(1)} s`;
	const minutes = Math.round(ms / 60_000);
	if (ms < 600_000) {
		const seconds = Math.round(ms / 1_000);
		return `${Math.floor(seconds / 60)} min ${seconds % 60} s`;
	}
	if (minutes < 60) return `${minutes} min`;
	return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

export function clip(text: string, max = MAX_INLINE): string {
	const flat = text.replace(/\s+/g, ' ').trim();
	return flat.length > max ? `${flat.slice(0, max)}…` : flat;
}

export function compact(value: unknown, max = MAX_INLINE): string {
	if (value === undefined) return '';
	if (typeof value === 'string') return clip(value, max);
	try {
		return clip(JSON.stringify(value), max);
	} catch {
		return clip(String(value), max);
	}
}

export function errorText(value: unknown): string {
	if (value && typeof value === 'object') {
		const { name, message } = value as Data;
		if (message) return compact(name ? `${name}: ${message}` : message);
	}
	return compact(value);
}

export const ok = (text: string): Line => ({
	text,
});

export const bad = (text: string): Line => ({
	text,
	problem: true,
});
