/** Raw Figma "Design Tokens" export shape (a recursive tree of groups and leaf tokens). */
export type TokenType = 'color' | 'number' | 'string';

export interface FigmaColorValue {
	colorSpace?: string;
	components?: number[];
	alpha?: number;
	hex: string;
}

export type TokenValue =
	| string
	| number
	| FigmaColorValue
	| Record<string, unknown>;

export interface TokenLeaf {
	$type: string;
	$value: TokenValue;
	$extensions?: Record<string, unknown>;
}

export type TokenNode =
	| TokenLeaf
	| {
			[key: string]: TokenNode;
	  }
	| Record<string, unknown>;

export type TokenTree = Record<string, TokenNode>;

/** One theme variant to generate CSS for (e.g. light/dark). */
export interface ThemeConfig {
	name: string;
	file: string;
	selector: string;
}

/** A single source of token files: either an app under apps/<app-name>/ or the shared lib/. */
export interface TokenSource {
	/** Human-readable label used in log/error messages, e.g. "apps/agent-workspace-app" or "lib". */
	label: string;
	/** Absolute path to the directory containing the theme input files. */
	inputDir: string;
	/** Absolute path to the directory the generated CSS tree should be written to. */
	outputDir: string;
}

/** A resolved leaf variable ready to be emitted as a CSS custom property. */
export interface Variable {
	pathSegments: string[];
	cssVarName: string;
	type: TokenType;
	cssValue: string;
}

/** Variables grouped by their containing folder (all path segments except the last). */
export interface Folder {
	folderSegments: string[];
	variables: Variable[];
}
