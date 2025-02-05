import { z } from 'zod';

export interface BaseValidator {
  evaluate: () => z.ZodError[];
  invalid: boolean;
  errors: z.ZodError[];
}

export interface IValidatorRule extends BaseValidator {}

export interface IValidatorScope extends BaseValidator {
  scope: BaseValidator[];
  push: (v: BaseValidator | BaseValidator[]) => void;
}

export class ValidatorScope implements IValidatorScope {
  errors: z.ZodError[] = [];
  scope: Array<BaseValidator> = [];

  get invalid(): boolean {
    return this.scope.some((validator) => validator.invalid);
  }

  push(v: BaseValidator | BaseValidator[]) {
    if (Array.isArray(v)) {
      this.scope.push(...v);
    } else {
      this.scope.push(v);
    }
  }

  evaluate() {
    this.errors = this.scope.flatMap((validator) => validator.evaluate());
    return this.errors;
  }
}

export class ValidatorRule implements IValidatorRule {
  errors: z.ZodError[] = [];

  constructor(
    public z: z.AnyZodObject,
    public data: unknown,
    // private config?: ValidatorRuleConfig,
  ) {}

  get invalid() {
    return !!this.errors.length;
  }

  evaluate(): z.ZodError[] {
    this.errors = this.z.safeParse(this.data);
    return this.errors;
  }
}

export const createVScope = (scope?: IValidatorScope[]) => {
  const vScope = new ValidatorScope(scope);
  return vScope;
};

export const createVRule = (z: z.AnyZodObject, data: Validatable) => {
  const vRule = new ValidatorRule({ z, data, config });
  return vRule;
};
