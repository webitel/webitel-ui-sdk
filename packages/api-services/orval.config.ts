import {
  builder,
  generateAxiosFooter,
  generateAxiosHeader,
  generateAxiosTitle,
} from '@orval/axios';
import { defineConfig } from 'orval';
import { pascalCase as pascal } from 'change-case';
import isJson from 'is-json';

const outputWorkspace = './src/gen';
const outputTarget = '';
const inputTarget = './formatted-openapi.yaml';
// const inputTarget = 'https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json';
const sharedGenFileExtension = 'gen.ts';

const runFormatterCLICommand =
  // 'true';
  'npx biome check --write --unsafe'; /* coz prettier doenst work 🤷🤷‍🤷‍♀️ */

const inputOverrideTransformer = (openApi /*: OpenAPIObject*/) => {
  for (const [name, schema] of Object.entries(
    openApi.components?.schemas ?? {},
  )) {
    const enumProp = schema /* as SchemaObject*/.enum;
    const defaultValueProp = schema /* as SchemaObject*/.default;

    if (enumProp) {
      openApi.components.schemas[name]['x-enumNames'] = enumProp.map(pascal);
    }

    if (defaultValueProp && isJson(defaultValueProp)) {
      openApi.components.schemas[name].default = JSON.parse(defaultValueProp);
    }

    for (const [nameNested, schemaNested] of Object.entries(
      schema /* as SchemaObject*/?.properties ?? {},
    )) {
      const enumProp = schemaNested /* as SchemaObject*/.enum;
      if (enumProp) {
        openApi.components.schemas[name] /* as SchemaObject*/.properties[
          nameNested
        ]['x-enumNames'] = enumProp.map(pascal);
      }
    }
  }

  return openApi;
};

export default defineConfig({
  main: {
    input: {
      target: inputTarget,
      override: {
        transformer: inputOverrideTransformer,
        //   transformer: (openAPIObject) => {
        //     console.info(JSON.stringify(openAPIObject, null, 2));
        //     return openAPIObject;
        //   },
      },
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
      target: inputTarget,
      override: {
        transformer: inputOverrideTransformer,
      },
    },
    output: {
      workspace: outputWorkspace,
      target: outputTarget,
      fileExtension: `.zod.${sharedGenFileExtension}`,
      client: 'zod',
      mode: 'tags-split',
      indexFiles: true,
      schemas: '_models',
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
    dependencies: () => {
      return [
        /*
          defaults are:
          ISSUE: https://github.com/orval-labs/orval/discussions/1373#discussioncomment-12735345
          CODE:  https://github.com/orval-labs/orval/blob/a154264719ccc49b3ab95dadbb3d62513110d8c3/packages/axios/src/index.ts#L22
        */
        {
          exports: [
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
          dependency: '@aliasedDeps/api-services/axios',
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
