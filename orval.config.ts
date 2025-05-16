import {
  builder,
  generateAxios,
  generateAxiosFooter,
  generateAxiosFunctions,
  generateAxiosHeader,
  generateAxiosTitle,
  getAxiosDependencies,
} from '@orval/axios';
import { defineConfig } from 'orval';

const outputWorkspace = './src/api/orval';
const outputTarget = '';
// const inputTarget = '../protos/gen/engine/swagger/v3/openapi.yaml';
const inputTarget = './formatted-openapi.yaml';
const sharedGenFileExtension = 'gen.ts';

const runFormatterCLICommand = 'true';
// 'npx biome check --write --unsafe'; /* coz prettier doenst work 🤷🤷‍🤷‍♀️ */

export default defineConfig({
  main: {
    input: {
      target:
        // 'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json',
        inputTarget,
      override: {},
    },
    output: {
      workspace: outputWorkspace,
      target: outputTarget,
      fileExtension: `.api.${sharedGenFileExtension}`,
      // client: 'axios',
      client: axiosClient,
      mock: true,
      mode: 'tags-split',
      clean: true,
      indexFiles: true,
      schemas: '_models',
      docs: {
        configPath: 'typedoc.config.mjs',
      },
      override: {
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
  zod: {
    input: {
      target:
        // 'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json',
        inputTarget,
    },
    output: {
      workspace: outputWorkspace,
      target: outputTarget,
      fileExtension: `.zod.${sharedGenFileExtension}`,
      client: 'zod',
      mode: 'tags-split',
      // schemas: './src/api/schemas',
      override: {
        zod: {
          generate: {
            response: true, // minimum required, least is optional, hai bude
            query: true,
            header: true,
            param: true,
            body: true,
          },
          // coerce: {
          //   response: [ 'boolean'],
          //   query: ['string', 'number', 'boolean', 'bigint', 'date'],
          // },
        },
      },
    },

    hooks: {
      afterAllFilesWrite: runFormatterCLICommand,
    },
  },
});

function axiosClient() {
  const axiosBuilder = builder({ type: 'axios' })();
  return {
    ...axiosBuilder,
    dependencies: (...params) => {
      /**
       * // default is:
       * // ISSUE: https://github.com/orval-labs/orval/discussions/1373#discussioncomment-12735345
       *    //   CODE:    // https://github.com/orval-labs/orval/blob/a154264719ccc49b3ab95dadbb3d62513110d8c3/packages/axios/src/index.ts#L22
       *  {
       *               exports: [
       *                 {
       *                   name: 'Axios',
       *                   default: true,
       *                   values: true,
       *                   syntheticDefaultImport: true,
       *                 },
       *                 { name: 'AxiosRequestConfig' },
       *                 { name: 'AxiosResponse' },
       *                 { name: 'CreateAxiosDefaults' },
       *               ],
       *               dependency: 'axios',
       *             },
       */
      const defaultDeps = getAxiosDependencies(...params).map((dep) => {
        // if (dep.dependency === 'axios') {
        //   return {
        //     ...dep,
        //     dependency: 'axalias',
        //   };
        // }

        return dep;
      });
      // return [...defaultDeps];

      return [
        // default is:
        // ISSUE: https://github.com/orval-labs/orval/discussions/1373#discussioncomment-12735345
        //   CODE:    // https://github.com/orval-labs/orval/blob/a154264719ccc49b3ab95dadbb3d62513110d8c3/packages/axios/src/index.ts#L22
        {
          exports: [
            // {
            //   name: 'Axios',
            //   default: true,
            //   values: true,
            //   syntheticDefaultImport: true,
            // },
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
            // {
            //   name: 'axios',
            //   default: true,
            //   values: true,
            //   syntheticDefaultImport: true,
            // },
            {
              name: 'makeAxios',
              values: true,
            },
          ],
          dependency: 'axalias',
        },
        // {
        //   dependency: './',
        // },
      ];
    },
    header: (params) => {
      const operationNames = '';
      return `

            // --- header start
            // ${'JSON.stringify(params, null, 2)'}
              import * as veees from './${params.tag}.zod.gen';
            ${generateAxiosHeader(params)}
            
            const axios = makeAxios({
              clientParams: ${'JSON.stringify(params, null, 2)'},
              v: veees,
            });

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
