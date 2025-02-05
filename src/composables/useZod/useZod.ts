import { inject, ref } from 'vue';
import { z } from 'zod';

export type ZodScope = z.AnyZodObject[];

export interface useZodScope {
  evaluate: () => void;
  invalid: boolean;
}

export const useZodScope = (): useZodScope => {
  const scope: ZodScope = [];

  return {
    scope,

    evaluate: () => {},
    invalid: false,
  };
};

export interface ZodRule {
  evaluate: () => void;
  invalid: boolean;
  message: z.ZodIssueOptionalMessage;
  watchValue: () => void;
  unwatchValue: () => void;
}

export const useScopedZod = (_scope?: ZodScope) => {
  const scope = _scope || inject('zodScope');

  const add = (z: z.AnyZodObject, data): ZodRule => {
    const result: z.SafeParseError<any> | null = ref(null);

    const evaluate = () => {
      result.value = z.safeParse(data);
    };

    return {
      evaluate,
      message: '123',
    };
  };

  return {
    add,
  };
};
