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

export default defineConfig({
  main: {
    input: {
      target:
        // 'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json',
        '../protos/swagger/engine.swagger.json',
    },
    output: {
      target: './src/api/orval',
      // client: 'axios',
      client: () => {
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
                  {
                    name: 'axios',
                    default: true,
                    values: true,
                    syntheticDefaultImport: true,
                  },
                ],
                dependency: 'axalias',
              },
            ];
          },
          header: (params) => `

            // --- header start
            ${generateAxiosHeader(params)}
            // --- header end

          `,
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
      },
      mode: 'tags-split',
      indexFiles: true,
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
        // transformer: (verb) => {
        //   console.info(verb);
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
        '../protos/swagger/engine.swagger.json',
    },
    output: {
      target: './src/api/orval/_zod',
      // target: './src/api/orval',
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
