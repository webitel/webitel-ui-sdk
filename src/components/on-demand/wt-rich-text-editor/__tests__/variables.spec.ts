// biome-ignore-all lint/suspicious/noTemplateCurlyInString: `${…}` is the variable syntax these strings are about, not a template literal
import type { Editor } from 'tinymce';

import {
	findVariableBraces,
	getVariableBraceRanges,
	insertVariable,
	setupVariables,
} from '../_internals/plugins/variables';

const BLOCKS = new Set([
	'P',
	'DIV',
	'LI',
	'H1',
	'H2',
]);
const isBlock = (node: Node) => BLOCKS.has(node.nodeName);

// [Claude] Built in the test's own document: in one from createHTMLDocument(),
// happy-dom collapses a Range once both its start and end are set
const containerWith = (html: string) => {
	const container = document.createElement('div');
	container.innerHTML = html;
	document.body.append(container);
	return container;
};

afterEach(() => {
	document.body.innerHTML = '';
});

const bracesIn = (html: string) =>
	getVariableBraceRanges(containerWith(html), isBlock).map((range) =>
		range.toString(),
	);

describe('variables plugin', () => {
	describe('findVariableBraces', () => {
		it('marks only the `${` and `}` of each variable', () => {
			const text = 'Dear ${client name}, see ${x}';
			const braces = findVariableBraces(text);

			expect(braces.map(([start, end]) => text.slice(start, end))).toEqual([
				'${',
				'}',
				'${',
				'}',
			]);
			expect(braces[0]).toEqual([
				5,
				7,
			]);
		});

		it('takes an empty `${}` and anything but `}` inside', () => {
			expect(findVariableBraces('${}')).toHaveLength(2);
			expect(findVariableBraces('${a.b-c 1 {x}')).toHaveLength(2);
		});

		it('ignores an unclosed `${` and a lone `{}`', () => {
			expect(findVariableBraces('${client')).toEqual([]);
			expect(findVariableBraces('{client}')).toEqual([]);
		});
	});

	describe('getVariableBraceRanges', () => {
		it('finds braces across formatting inside one block', () => {
			expect(bracesIn('<p>Hi ${cli<b>ent</b>} and ${x}</p>')).toEqual([
				'${',
				'}',
				'${',
				'}',
			]);
		});

		it('does not join text of different blocks into a variable', () => {
			expect(bracesIn('<p>${client</p><p>name}</p>')).toEqual([]);
		});
	});

	describe('insertVariable', () => {
		it('inserts `${}` and leaves the caret between the braces', () => {
			const text = containerWith('<p>Hi </p>').firstChild?.firstChild as Text;
			let range = document.createRange();
			range.setStart(text, 3);
			range.collapse(true);

			// [Claude] TinyMCE's insertContent at the caret, reduced to a text insert
			const editor = {
				focus: vi.fn(),
				insertContent: (html: string) => {
					const at = range.startOffset;
					text.insertData(at, html);
					range = document.createRange();
					range.setStart(text, at + html.length);
					range.collapse(true);
				},
				selection: {
					getRng: () => range,
					setRng: (next: Range) => {
						range = next;
					},
				},
			};

			insertVariable(editor as unknown as Editor);

			expect(text.data).toBe('Hi ${}');
			expect(range.startOffset).toBe(5);
			expect(range.collapsed).toBe(true);
		});
	});

	describe('setupVariables', () => {
		const register = (skin = 'oxide') => {
			const registered: Record<string, unknown> = {};
			const editor = {
				contentStyles: [] as string[],
				options: {
					get: (name: string) => (name === 'skin' ? skin : undefined),
				},
				ui: {
					registry: {
						addIcon: (name: string) => {
							registered.icon = name;
						},
						addButton: (name: string, spec: unknown) => {
							registered.button = {
								name,
								spec,
							};
						},
					},
				},
				on: vi.fn(),
			};
			setupVariables(editor as unknown as Editor);
			return {
				editor,
				registered,
			};
		};

		it('adds a toolbar button with its own icon', () => {
			const { registered } = register();

			expect(registered.icon).toBe('wt-variable');
			expect(registered.button).toMatchObject({
				name: 'wtvariables',
				spec: {
					icon: 'wt-variable',
					tooltip: 'Insert variable',
				},
			});
		});

		it('colours the braces blue, lighter on the dark skin', () => {
			expect(register().editor.contentStyles.join()).toContain(
				'::highlight(wt-variable-brace) { color: #006ce7; }',
			);
			expect(register('oxide-dark').editor.contentStyles.join()).toContain(
				'#7ab8ff',
			);
		});

		it('re-highlights after edits, undo and new content', () => {
			const { editor } = register();

			expect(editor.on).toHaveBeenCalledWith(
				'init input NodeChange SetContent Undo Redo',
				expect.any(Function),
			);
		});
	});
});
