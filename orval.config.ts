import { defineConfig } from 'orval';

export default defineConfig({
  main: {
    input: {
      target: './openapi_with_validations.yaml',
    },
    // input: 'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json',
    output: {
      target: './src/api/orval',
      client: 'axios',
      mode: 'tags-split',
      // schemas: './_schemas',
      override: {
        // requestOptions: { smth11: 'smth' },
        operationName: ({ operationId: operationName}) => {
          if (operationName.includes('ServiceSearch')) {
            return 'getList';
          } else if (operationName.includes('ServiceRead')) {
            return 'get';
          } else if (operationName.includes('ServiceCreate')) {
            return 'add';
          } else if (operationName.includes('ServiceUpdate')) {
            return 'update';
          } else if (operationName.includes('ServiceDelete')) {
            return 'delete';
          } else if (operationName.includes('ServicePatch')) {
            return 'patch';
          }

          return operationName;
        },
        // NOTE: Use this to debug transformed options
        // transformer: (options: GeneratorVerbOptions): GeneratorVerbOptions => {
        //   console.info(JSON.stringify(options, null, 2));
        //   return options;
        },
      },
    },
    hooks: {
      // afterAllFilesWrite: 'prettier --write',
    },
});
