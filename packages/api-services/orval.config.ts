import {
	builder,
	generateAxiosFooter,
	generateAxiosHeader,
	generateAxiosTitle,
} from '@orval/axios';
import { defineConfig } from 'orval';

const outputWorkspace = './src/gen';
const outputTarget = '';
const inputTarget = './formatted-openapi.yaml';
/* internal: consumed by src/api/clients, not exported from package.json */
const wireOutputWorkspace = './src/gen-wire';
const wireInputTarget = './formatted-openapi.wire.yaml';
// const inputTarget = 'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json';
const sharedGenFileExtension = 'gen.ts';

const runFormatterCLICommand =
	// 'true';
	'npx biome check --write ./src/gen'; /* coz prettier doenst work 🤷🤷‍🤷‍♀️ */
const runWireFormatterCLICommand = 'npx biome check --write ./src/gen-wire';

export default defineConfig({
	main: {
		input: {
			target: inputTarget,
		},
		output: {
			workspace: outputWorkspace,
			target: outputTarget,
			// fileExtension: `.api.${sharedGenFileExtension}`,
			// client: 'axios',
			client: axiosClient,
			mode: 'tags-split',
			clean: true,
			indexFiles: true,
			schemas: './_models',
			// {
			//   path: './_models',
			//   type: 'typescript',
			// },
			override: {
				namingConvention: {
					enum: 'PascalCase',
				},
				// Use this to view transformed options formatting
				// transformer: (options: GeneratorVerbOptions): GeneratorVerbOptions => {
				//   console.info(JSON.stringify(options, null, 2));
				//   return options;
				// },
			},
		},

		hooks: {
			afterAllFilesWrite: runFormatterCLICommand,
		},
	},
	wire: {
		input: {
			target: wireInputTarget,
		},
		output: {
			workspace: wireOutputWorkspace,
			target: outputTarget,
			client: axiosClient,
			mode: 'tags-split',
			clean: true,
			indexFiles: true,
			schemas: './_models',
			override: {
				namingConvention: {
					enum: 'PascalCase',
				},
			},
		},

		hooks: {
			afterAllFilesWrite: runWireFormatterCLICommand,
		},
	},
	wireZod: {
		input: {
			target: wireInputTarget,
		},
		output: {
			workspace: wireOutputWorkspace,
			target: outputTarget,
			fileExtension: '.zod.ts',
			client: 'zod',
			mode: 'tags-split',
			indexFiles: true,
			schemas: './_models',
			override: {
				namingConvention: {
					enum: 'PascalCase',
				},
				zod: {
					generate: {
						response: true,
						query: true,
						header: true,
						param: true,
						body: true,
					},
				},
			},
		},

		hooks: {
			afterAllFilesWrite: runWireFormatterCLICommand,
		},
	},
});

function axiosClient() {
	const axiosBuilder = builder({
		type: 'axios',
	})();
	return {
		...axiosBuilder,
		dependencies: () => {
			return [
				/*
          defaults are:
          ISSUE: https://github.com/orval-labs/orval/discussions/1373#discussioncomment-12735345
          CODE:  https://github.com/orval-labs/orval/blob/a154264719ccc49b3ab95dadbb3d62513110d8c3/packages/axios/src/index.ts#L22
        */
				{
					exports: [
						{
							name: 'AxiosInstance',
						},
						{
							name: 'AxiosRequestConfig',
						},
						{
							name: 'AxiosResponse',
						},
						{
							name: 'CreateAxiosDefaults',
						},
					],
					dependency: 'axios',
				},
				{
					exports: [
						{
							name: 'axios',
							default: true,
							values: true,
							syntheticDefaultImport: true,
						},
					],
					/*
					  internal module, so the package needs no consumer-side alias.
					  consumers swap the default instance via setDefaultAxiosInstance(),
					  or pass one per service factory: getAgentService(myInstance).
					*/
					dependency: '../../api/axios/genClient',
				},
			];
		},
		header: (params) => {
			return `
            // --- header start
            // ${generateAxiosHeader(params)}
            // --- header end
          `;
		},
		footer: (params) => `
            // --- footer start
            ${generateAxiosFooter(params)}
            // --- footer end
          `,
		title: (title) => `
            // --- title start
            ${generateAxiosTitle(title)}
            // --- title end
          `,
	};
}
