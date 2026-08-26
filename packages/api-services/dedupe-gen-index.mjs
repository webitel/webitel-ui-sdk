/**
 * Post-processes the index.ts of each orval output dir passed as an argument
 * (defaults to src/gen), e.g. `node ./dedupe-gen-index.mjs src/gen src/gen-wire`.
 *
 * Orval emits the same schema names twice: as types in ./_models and as zod
 * runtime schemas in each service's *.zod.ts file. The generated barrel
 * star-exports both, which makes every duplicated name ambiguous (TS2308) —
 * neither the type nor the schema is importable from the barrel.
 *
 * This script rewrites each service star-export line into an explicit named
 * re-export. Explicit re-exports shadow star re-exports, so for duplicated
 * names the barrel resolves to the zod runtime schema (the value); the
 * matching types stay importable from '@webitel/api-services/gen/models'.
 * Runs as part of `npm run gen:api`.
 *
 * NOTE: this script was written by Claude (AI), not by a human.
 */
import fs from 'node:fs';
import path from 'node:path';

const genDirs = process.argv.slice(2);
if (genDirs.length === 0) genDirs.push(path.join('src', 'gen'));

// Tolerates orval's title comment splitting the declaration across lines:
// `export const // --- title start\n\tgetAccessStore = ...`
const EXPORT_NAME_RE =
	/^export (?:declare )?(?:const|let|var|function|class|interface|enum|type|abstract class)[ \t]*(?:\/\/[^\n]*)?\s*([A-Za-z0-9_$]+)/gm;

const readExportedNames = (filePath) => {
	const source = fs.readFileSync(filePath, 'utf8');
	return [
		...source.matchAll(EXPORT_NAME_RE),
	].map(([, name]) => name);
};

const resolveModuleFile = (fromDir, specifier) => {
	const base = path.join(fromDir, specifier);
	for (const candidate of [
		`${base}.ts`,
		path.join(base, 'index.ts'),
	]) {
		if (fs.existsSync(candidate)) return candidate;
	}
	throw new Error(`Cannot resolve module '${specifier}' from ${fromDir}`);
};

const collectStarExportedNames = (entryFile, seen = new Set()) => {
	if (seen.has(entryFile)) return [];
	seen.add(entryFile);

	const names = readExportedNames(entryFile);
	const source = fs.readFileSync(entryFile, 'utf8');
	for (const [, specifier] of source.matchAll(
		/^export \* from '([^']+)';?$/gm,
	)) {
		const resolved = resolveModuleFile(path.dirname(entryFile), specifier);
		names.push(...collectStarExportedNames(resolved, seen));
	}
	return names;
};

const dedupeGenDir = (genDirRelative) => {
	const genDir = path.join(import.meta.dirname, genDirRelative);
	const indexPath = path.join(genDir, 'index.ts');

	/*
	  Both orval passes write into _models, and the schema pass emits nothing but
	  a second declaration of each type. Older orval hid that by overwriting the
	  barrel with one of the two sets; newer versions merge them, so every name
	  becomes ambiguous. Drop the duplicates and rebuild the barrel from what is
	  left, so the result does not depend on that behaviour.
	*/
	const modelsDir = path.join(genDir, '_models');
	let duplicateModels = 0;
	for (const entry of fs.readdirSync(modelsDir)) {
		if (!entry.endsWith('.zod.ts')) continue;
		if (
			!fs.existsSync(
				path.join(modelsDir, `${entry.slice(0, -'.zod.ts'.length)}.ts`),
			)
		) {
			continue;
		}
		fs.rmSync(path.join(modelsDir, entry));
		duplicateModels += 1;
	}
	if (duplicateModels > 0) {
		const models = fs
			.readdirSync(modelsDir)
			.filter((entry) => entry.endsWith('.ts') && entry !== 'index.ts')
			.map((entry) => entry.slice(0, -'.ts'.length))
			.sort();
		fs.writeFileSync(
			path.join(modelsDir, 'index.ts'),
			`${models.map((name) => `export * from './${name}';`).join('\n')}\n`,
		);
	}

	const modelNames = new Set(
		collectStarExportedNames(path.join(genDir, '_models', 'index.ts')),
	);

	const indexSource = fs.readFileSync(indexPath, 'utf8');
	// Names already re-exported explicitly by an earlier rewritten line; a name
	// may only have one explicit re-export in the barrel (first module wins).
	const explicitlyExported = new Set();
	let deduped = 0;

	const rewritten = indexSource.replace(
		/^export \* from '(\.\/(?!_models(?:\/|')).+)';$/gm,
		(line, specifier) => {
			const moduleFile = resolveModuleFile(genDir, specifier);
			const exported = readExportedNames(moduleFile);
			const conflicts = exported.filter(
				(name) => modelNames.has(name) || explicitlyExported.has(name),
			);
			if (conflicts.length === 0) return line;

			deduped += conflicts.length;
			const kept = exported.filter((name) => !explicitlyExported.has(name));
			for (const name of kept) {
				if (modelNames.has(name)) explicitlyExported.add(name);
			}
			if (kept.length === 0) {
				return `// export * from '${specifier}'; // all exports already re-exported above`;
			}
			return `export {\n\t${kept.join(',\n\t')},\n} from '${specifier}';`;
		},
	);

	if (rewritten !== indexSource) {
		fs.writeFileSync(indexPath, rewritten);
	}
	console.info(
		`dedupe-gen-index: resolved ${deduped} ambiguous re-exports and ${duplicateModels} duplicate model schemas in ${genDirRelative}`,
	);
};

for (const genDirRelative of genDirs) {
	dedupeGenDir(genDirRelative);
}
