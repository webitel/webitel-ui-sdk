import { defineConfig } from 'orval';

export default defineConfig({
  main: {
    input: {
      target:
        'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json',
    },
    output: {
      target: './src/api/orval',
      client: 'axios',
      mode: 'tags-split',
      // schemas: './src/api/schemas',
      override: {
        operationName: ({ operationId: operationName }) => {
          // console.info(operationName);
          if (operationName.includes('Search')) {
            return 'getList';
          } else if (operationName.includes('Read')) {
            return 'get';
          } else if (operationName.includes('Create')) {
            return 'add';
          } else if (operationName.includes('Update')) {
            return 'update';
          } else if (operationName.includes('Delete')) {
            return 'delete';
          } else if (operationName.includes('Patch')) {
            return 'patch';
          }

          return operationName;
        },
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
        './openapiv2.json',
    },
    output: {
      target: './src/api/orval/_zod',
      client: 'zod',
      mode: 'tags-split',
      // schemas: './src/api/schemas',
      override: {
        zod: {
          default: true,
          coerce: {
            response: ['boolean'],
            query: ['string', 'number', 'boolean', 'bigint', 'date'],
          },
        },
        operationName: ({ operationId: operationName }) => {
          // console.info(operationName);
          if (operationName.includes('Search')) {
            return 'getList';
          } else if (operationName.includes('Read')) {
            return 'get';
          } else if (operationName.includes('Create')) {
            return 'add';
          } else if (operationName.includes('Update')) {
            return 'update';
          } else if (operationName.includes('Delete')) {
            return 'delete';
          } else if (operationName.includes('Patch')) {
            return 'patch';
          }

          return operationName;
        },
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
});
