// biome-ignore-all lint/suspicious/noTemplateCurlyInString: `${…}` is the variable syntax these strings are about, not a template literal
/**
 * [Claude] Variables for wt-rich-text-editor: free-form `${name}` placeholders the
 * backend fills in later. The toolbar button inserts `${}` with the caret inside,
 * and every `${…}` in the text gets its `${` and `}` coloured.
 *
 * Variables stay plain, editable text: the colouring uses the CSS Custom
 * Highlight API, which paints character ranges without touching the content,
 * so editing, undo and the saved HTML are unaffected. Browsers without the API
 * simply show no colouring.
 *
 * Registers on the global `tinymce`, so `loadTinyMce` imports it after the core.
 */
import type { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

export const VARIABLES_PLUGIN = 'wtvariables';

const HIGHLIGHT_NAME = 'wt-variable-brace';
const ICON_NAME = 'wt-variable';
const TEXT_NODE = 3;
const REFRESH_DELAY = 50;

// [Claude] anything but `}` between the braces, empty included; `${name` without `}` is not a variable
const VARIABLE_PATTERN = /\$\{[^}]*\}/g;

const ICON = `<svg width="24" height="24" viewBox="0 0 24 24"><text x="12" y="16" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold">\${}</text></svg>`;

const highlightCss = (isDark: boolean) =>
	`::highlight(${HIGHLIGHT_NAME}) { color: ${isDark ? '#7ab8ff' : '#006ce7'}; }`;

/**
 * [Claude] The `${` and `}` of every variable in `text`, as [start, end) offsets.
 */
export function findVariableBraces(text: string): Array<
	[
		number,
		number,
	]
> {
	const braces: Array<
		[
			number,
			number,
		]
	> = [];
	for (const match of text.matchAll(VARIABLE_PATTERN)) {
		const start = match.index ?? 0;
		const end = start + match[0].length;
		braces.push(
			[
				start,
				start + 2,
			],
			[
				end - 1,
				end,
			],
		);
	}
	return braces;
}

interface TextRun {
	text: string;
	nodes: Array<{
		node: Text;
		start: number;
	}>;
}

// [Claude] Text per block, so a variable split by formatting (`${cli<b>ent</b>}`) still counts
function collectTextRuns(
	root: Node,
	isBlock: (node: Node) => boolean,
): TextRun[] {
	const doc = root.ownerDocument ?? (root as Document);
	const walker = doc.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */);
	const blockOf = (node: Node) => {
		let current = node.parentNode;
		while (current && current !== root && !isBlock(current))
			current = current.parentNode;
		return current;
	};

	const runs: TextRun[] = [];
	let currentBlock: Node | null = null;
	let run: TextRun | null = null;
	for (let node = walker.nextNode(); node; node = walker.nextNode()) {
		const text = node as Text;
		const block = blockOf(text);
		if (!run || block !== currentBlock) {
			run = {
				text: '',
				nodes: [],
			};
			runs.push(run);
			currentBlock = block;
		}
		run.nodes.push({
			node: text,
			start: run.text.length,
		});
		run.text += text.data;
	}
	return runs;
}

function locate(run: TextRun, index: number, isEnd: boolean) {
	const found = run.nodes.find(({ node, start }) =>
		isEnd
			? index <= start + node.data.length
			: index < start + node.data.length,
	);
	return found
		? {
				node: found.node,
				offset: index - found.start,
			}
		: null;
}

/**
 * [Claude] DOM ranges covering the braces of every variable under `root`.
 */
export function getVariableBraceRanges(
	root: Node,
	isBlock: (node: Node) => boolean,
): Range[] {
	const doc = root.ownerDocument ?? (root as Document);
	return collectTextRuns(root, isBlock).flatMap((run) =>
		findVariableBraces(run.text).flatMap(([start, end]) => {
			const from = locate(run, start, false);
			const to = locate(run, end, true);
			if (!from || !to) return [];
			const range = doc.createRange();
			range.setStart(from.node, from.offset);
			range.setEnd(to.node, to.offset);
			return [
				range,
			];
		}),
	);
}

/**
 * [Claude] Inserts `${}` at the caret and leaves the caret between the braces.
 */
export function insertVariable(editor: Editor) {
	editor.focus();
	editor.insertContent('${}');
	const range = editor.selection.getRng();
	if (range.startContainer.nodeType === TEXT_NODE && range.startOffset > 0) {
		range.setStart(range.startContainer, range.startOffset - 1);
		range.collapse(true);
		editor.selection.setRng(range);
	}
}

export function setupVariables(editor: Editor) {
	editor.contentStyles.push(
		highlightCss(editor.options.get('skin') === 'oxide-dark'),
	);

	editor.ui.registry.addIcon(ICON_NAME, ICON);
	editor.ui.registry.addButton(VARIABLES_PLUGIN, {
		icon: ICON_NAME,
		// [Claude] translated by TinyMCE from the language modules (see langs/README.md)
		tooltip: 'Insert variable',
		onAction: () => insertVariable(editor),
	});

	const highlightRegistry = () => {
		const win = editor.getWin() as (Window & typeof globalThis) | undefined;
		return win?.CSS?.highlights && win.Highlight
			? {
					// [Claude] a maplike registry; this TypeScript version's DOM types omit its Map methods
					highlights: win.CSS.highlights as unknown as Map<string, Highlight>,
					Highlight: win.Highlight,
				}
			: null;
	};

	const refresh = () => {
		const registry = highlightRegistry();
		const body = editor.getBody();
		if (!registry || !body) return;
		const ranges = getVariableBraceRanges(body, (node) =>
			editor.dom.isBlock(node),
		);
		registry.highlights.set(HIGHLIGHT_NAME, new registry.Highlight(...ranges));
	};

	let refreshTimer: ReturnType<typeof setTimeout> | undefined;
	const scheduleRefresh = () => {
		clearTimeout(refreshTimer);
		refreshTimer = setTimeout(refresh, REFRESH_DELAY);
	};

	editor.on('init input NodeChange SetContent Undo Redo', scheduleRefresh);
	editor.on('remove', () => {
		clearTimeout(refreshTimer);
		highlightRegistry()?.highlights.delete(HIGHLIGHT_NAME);
	});
}

if (typeof tinymce !== 'undefined') {
	tinymce.PluginManager.add(VARIABLES_PLUGIN, setupVariables);
}
