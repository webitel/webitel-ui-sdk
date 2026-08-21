// insert-text-at-cursor ships no types and has no @types package
declare module 'insert-text-at-cursor' {
	export default function insertTextAtCursor(
		el: HTMLInputElement | HTMLTextAreaElement,
		text: string,
	): void;
}
