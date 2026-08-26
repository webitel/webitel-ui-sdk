/**
 * Strips the generated service layer from the camelCase pass.
 *
 * src/gen exists for the apps: camelCase models, enums and their zod schemas,
 * all under _models. The clients that talk to the gateway are generated from
 * the raw spec into src/gen-wire, so the camel pass's per-tag clients, zod and
 * mocks are dead weight the moment they are written - and a trap, since their
 * params are typed in a casing the gateway is not documented to accept.
 *
 * Orval has no "schemas only" switch, so they are generated and removed here.
 * Runs as part of `npm run gen:api`.
 */
import fs from 'node:fs';
import path from 'node:path';

const genDir = path.join(import.meta.dirname, 'src', 'gen');
const keep = new Set([
	'_models',
	'_docs',
]);

let removed = 0;
for (const entry of fs.readdirSync(genDir)) {
	if (keep.has(entry)) continue;
	fs.rmSync(path.join(genDir, entry), {
		recursive: true,
		force: true,
	});
	removed += 1;
}

fs.writeFileSync(path.join(genDir, 'index.ts'), "export * from './_models';\n");

console.info(
	`prune-camel-services: removed ${removed} generated entries from src/gen`,
);
