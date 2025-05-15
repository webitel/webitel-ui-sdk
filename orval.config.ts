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

const sharedOutputTarget = './src/api/orval';
const sharedGenFileExtension = 'gen.ts';

export default defineConfig({
  main: {
    input: {
      target:
        // 'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json',
        '../protos/swagger/cases.swagger.json',
    },
    output: {
      target: sharedOutputTarget,
      fileExtension: `.${sharedGenFileExtension}`,
      // client: 'axios',
      client: axiosClient,
      mock: true,
      mode: 'tags-split',
      clean: true,
      namingConvention: 'camelCase',
      indexFiles: true,
      schemas: './src/api/orval/_schemas',
      docs: {
        configPath: './typedoc.config.mjs',
      },
      /*docs: {
        theme: 'default',
        out: './src/api/orval/_docs-html',
        disableSources: true,
        entryPoints: ['./src/api/orval/webitelAPI.schemas.ts'],
        exclude: ['**!/main.ts']
        // entryPoints: ['**!/api/orval/!**!/!*.ts'],
      },*/
      // schemas: './src/api/schemas',
      override: {
        // mutator: {
        // path: './src/api/utilz/withValidation.ts',
        // name: 'withValidation',
        // },
        // requestOptions: true,
        // transformer: (verb) => {
        //   const mutatedVerb = { ...verb };
        //   // Add operationId to the config
        //   if (mutatedVerb.request?.implementation) {
        //     mutatedVerb.request.implementation =
        //       mutatedVerb.request.implementation.replace(
        //         /({[^}]+})/,
        //         `{ ...($1), __operationId: '${verb.operationId}' }`,
        //       );
        //   }
        //   return mutatedVerb;
        // },
        // transformer: (verb) => {
        //   console.info(JSON.stringify(verb, null, 2));
        //   console.info('\n\n\n\n\n');
        //   return verb;
        // },
        // operationName: ({operationId: operationName}) => {
        //   // console.info(operationName);
        //   if (operationName.includes('Search')) {
        //     return 'getList';
        //   } else if (operationName.includes('Read')) {
        //     return 'get';
        //   } else if (operationName.includes('Create')) {
        //     return 'add';
        //   } else if (operationName.includes('Update')) {
        //     return 'update';
        //   } else if (operationName.includes('Delete')) {
        //     return 'delete';
        //   } else if (operationName.includes('Patch')) {
        //     return 'patch';
        //   }
        //
        //   return operationName;
        // },
        // NOTE: Use this to debug transformed options
        // transformer: (options: GeneratorVerbOptions): GeneratorVerbOptions => {
        //   console.info(JSON.stringify(options, null, 2));
        //   return options;
        // },
      },
    },

    hooks: {
      // afterAllFilesWrite: 'prettier --write',
    },
  },
  zod: {
    input: {
      target:
        // 'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json',
        '../protos/swagger/cases.swagger.json',
    },
    output: {
      target: sharedOutputTarget,
      fileExtension: `.zod.${sharedGenFileExtension}`,
      client: 'zod',
      mode: 'tags-split',
      // schemas: './src/api/schemas',
      override: {
        zod: {
          generate: {
            response: true,
            query: false,
            header: false,
            param: false,
            body: true,
          },
          // coerce: {
          //   response: [ 'boolean'],
          //   query: ['string', 'number', 'boolean', 'bigint', 'date'],
          // },
        },
        // operationName: ({ operationId: operationName }) => {
        //   // console.info(operationName);
        //   if (operationName.includes('Search')) {
        //     return 'getList';
        //   } else if (operationName.includes('Read')) {
        //     return 'get';
        //   } else if (operationName.includes('Create')) {
        //     return 'add';
        //   } else if (operationName.includes('Update')) {
        //     return 'update';
        //   } else if (operationName.includes('Delete')) {
        //     return 'delete';
        //   } else if (operationName.includes('Patch')) {
        //     return 'patch';
        //   }
        //
        //   return operationName;
        // },
        // NOTE: Use this to debug transformed options
        // transformer: (options: GeneratorVerbOptions): GeneratorVerbOptions => {
        //   console.info(JSON.stringify(options, null, 2));
        //   return options;
        // },
      },
    },

    hooks: {
      // afterAllFilesWrite: 'prettier --write',
    },
  },
  /*'docs-html': {
    input: {
      target: 'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json',
    },
    output: {
      // target: './src/api/orval/_docs',
      docs: {
        theme: 'default',
        out: './_docs-html',
        disableSources: true,
        // entryPoints: '',
        entryPoints: ['./src/api/orval/webitelAPI.schemas.ts'],
      },
    },
  },*/
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
            { name: 'AxiosRequestConfig' },
            { name: 'AxiosResponse' },
            { name: 'CreateAxiosDefaults' },
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
             import { validateResponse } from '../utils/validate-response';
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
            
            const getList = ${JSON.stringify(params, null, 2)};
            
            ${generateAxiosFooter(params)}
            // --- footer end
          `,
    title: (title) => `

            // --- title start
            ${generateAxiosTitle(title)}
            // --- title end

          `,
    // extraFiles: () => `
    //
    //   // --- extraFiles start
    //   ${axiosBuilder.extraFiles}
    //   // --- extraFiles end
    //
    // `,

    // ...axiosBuilder,
    // dependencies: () => {
    // return [
    //   {
    //     exports: [
    //       {
    //         name: 'Axios',
    //         default: true,
    //         values: true,
    //         syntheticDefaultImport: true,
    //       },
    //       { name: 'AxiosRequestConfig' },
    //       { name: 'AxiosResponse' },
    //       { name: 'CreateAxiosDefaults' },
    //     ],
    //     dependency: 'axios',
    //   },
    // ];
    // },
    // header: () => {
    //   //             return `
    //   // export const createApiClient = (config?: CreateAxiosDefaults) => {
    //   //   const axios = Axios.create(config);
    //   //
    //   // `;
    // },
    // footer: (params) => {
    //   const result = generateAxiosFooter(params);
    //   return result.replace(
    //     /return {(.+?)}/,
    //     (_, captured) => `return {${captured}, axios}`,
    //   );
    // },
  };
  // const axiosBuilder = builder({ type: 'axios-functions' })();
  //
  // return axiosBuilder;
}
