// any value -> JSON-safe plain value with secrets removed and PII masked
import { MAX_TEXT_CHARS } from '../config';
import {
	CONTENT_KEY_RE,
	FREE_DATA_KEY_RE,
	isSecretKey,
	PARTY_KEY_RE,
	PARTY_NAME_KEY_RE,
	PII_CAMEL_KEY_RE,
	PII_KEY_RE,
	REDACTED,
} from './patterns';
import { maskPii, type RedactTextOptions, redactText, truncate } from './text';

export interface SanitizeOptions extends RedactTextOptions {
	maxDepth?: number;
	maxKeys?: number;
	maxText?: number;
}

export function describeNode(node: Node): string {
	if (typeof Element !== 'undefined' && node instanceof Element) {
		const id = node.id ? `#${node.id}` : '';
		const cls =
			typeof node.className === 'string' && node.className
				? `.${node.className.trim().split(/\s+/).slice(0, 3).join('.')}`
				: '';
		return `<${node.tagName.toLowerCase()}${id}${cls}>`;
	}
	return `[${node.nodeName}]`;
}

// any value -> JSON-safe plain value with secrets removed and PII masked (cycles, DOM, errors, Vue proxies)
export function sanitize(value: unknown, opts: SanitizeOptions = {}): unknown {
	const maxDepth = opts.maxDepth ?? 6;
	const maxKeys = opts.maxKeys ?? 100;
	const maxText = opts.maxText ?? MAX_TEXT_CHARS;
	const seen = new WeakSet<object>();

	const walk = (v: unknown, depth: number, parentKey = ''): unknown => {
		if (v === null || v === undefined) return v;
		switch (typeof v) {
			case 'string':
				return truncate(redactText(v, opts), maxText);
			case 'number':
			case 'boolean':
				return v;
			case 'bigint':
				return `${v}n`;
			case 'symbol':
				return v.toString();
			case 'function':
				return `[Function ${
					(
						v as {
							name?: string;
						}
					).name || 'anonymous'
				}]`;
		}

		let obj = v as object;
		// Vue reactive proxy: read the raw target (untracked), so logging inside a
		// render/computed does not subscribe it to every field of the logged object
		for (
			let raw = (
				obj as {
					__v_raw?: unknown;
				}
			).__v_raw;
			raw && typeof raw === 'object' && raw !== obj;
			raw = (
				obj as {
					__v_raw?: unknown;
				}
			).__v_raw
		) {
			obj = raw;
		}
		if (obj instanceof Error) {
			return {
				name: obj.name,
				message: walk(obj.message, depth + 1),
				stack: obj.stack ? truncate(redactText(obj.stack), maxText) : undefined,
				cause: obj.cause === undefined ? undefined : walk(obj.cause, depth + 1),
			};
		}
		if (typeof Node !== 'undefined' && obj instanceof Node) {
			return describeNode(obj);
		}
		if (typeof Event !== 'undefined' && obj instanceof Event) {
			const target = obj.target;
			return {
				event: obj.type,
				target:
					typeof Node !== 'undefined' && target instanceof Node
						? describeNode(target)
						: undefined,
			};
		}
		if (obj instanceof ArrayBuffer) return `[ArrayBuffer ${obj.byteLength}]`;
		if (ArrayBuffer.isView(obj))
			return `[${obj.constructor.name} ${obj.byteLength}]`;
		if (typeof Blob !== 'undefined' && obj instanceof Blob)
			return `[Blob ${obj.size}]`;
		if (obj instanceof Date) return obj.toISOString();
		if (obj instanceof RegExp) return obj.toString();

		if (seen.has(obj)) return '[Circular]';
		if (depth >= maxDepth) return Array.isArray(obj) ? '[Array]' : '[Object]';
		seen.add(obj);

		if (Array.isArray(obj) || obj instanceof Set) {
			const items = Array.from(obj as Iterable<unknown>);
			// elements inherit the array's key, so `members: [{name}]` is still a party
			const out = items
				.slice(0, maxKeys)
				.map((item) => walk(item, depth + 1, parentKey));
			if (items.length > maxKeys)
				out.push(`…[+${items.length - maxKeys} items]`);
			return out;
		}

		const entries: [
			string,
			unknown,
		][] =
			obj instanceof Map
				? Array.from(obj.entries()).map(([k, val]) => [
						String(k),
						val,
					])
				: Object.keys(obj).map((k) => {
						try {
							return [
								k,
								(obj as Record<string, unknown>)[k],
							];
						} catch (err) {
							return [
								k,
								`[Throws: ${(err as Error)?.message}]`,
							];
						}
					});

		const out: Record<string, unknown> = {};
		const isParty = PARTY_KEY_RE.test(parentKey);
		for (const [key, val] of entries.slice(0, maxKeys)) {
			if (isSecretKey(key)) {
				out[key] =
					val === undefined || val === null || val === '' ? val : REDACTED;
			} else if (
				CONTENT_KEY_RE.test(key) &&
				typeof val === 'string' &&
				val.length
			) {
				out[key] = `[text: ${val.length} chars]`;
			} else if (
				(PII_KEY_RE.test(key) ||
					PII_CAMEL_KEY_RE.test(key) ||
					(isParty && PARTY_NAME_KEY_RE.test(key))) &&
				(typeof val === 'string' || typeof val === 'number') &&
				String(val).length
			) {
				out[key] = maskPii(String(val));
			} else if (
				FREE_DATA_KEY_RE.test(key) &&
				val !== null &&
				typeof val === 'object'
			) {
				out[key] = Object.fromEntries(
					Object.keys(val)
						.slice(0, maxKeys)
						.map((k) => [
							k,
							`[value: ${String((val as Record<string, unknown>)[k] ?? '').length} chars]`,
						]),
				);
			} else {
				out[key] = walk(val, depth + 1, key);
			}
		}
		if (entries.length > maxKeys) {
			out['…'] = `+${entries.length - maxKeys} keys`;
		}
		return out;
	};

	try {
		return walk(value, 0);
	} catch (err) {
		return `[Unserializable: ${(err as Error)?.message}]`;
	}
}

/** RTCConfiguration without TURN credentials */
export function sanitizeRtcConfig(config?: RTCConfiguration): unknown {
	if (!config) return config;
	return {
		...(sanitize(config, {
			maxDepth: 4,
		}) as object),
		iceServers: config.iceServers?.map((server) => ({
			urls: server.urls,
			username: server.username ? REDACTED : undefined,
			credential: server.credential ? REDACTED : undefined,
		})),
	};
}
