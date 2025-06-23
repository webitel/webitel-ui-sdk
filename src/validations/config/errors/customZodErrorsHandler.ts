import { ComposerTranslation as I18nComposerTranslation } from 'vue-i18n';
import { z } from 'zod/v4';

import { isEmpty } from '../../../scripts';

export const customZodErrorsHandler =
  (t: I18nComposerTranslation) => (issue: z.core.$ZodIssue) => {
    switch (issue.code) {
      case 'too_small':
        return handleTooSmall(issue);
      case 'too_big':
        return handleTooBig(issue);
      case 'invalid_value':
      case 'invalid_type':
        return handleInvalid(issue);
      default:
        return issue.code;
    }

    function handleTooSmall(issue: z.core.$ZodIssueTooSmall) {
      const showRequiredMsg = () => {
        return t('validation.required');
      };

      if (isEmpty(issue.input) as boolean) {
        return showRequiredMsg();
      }

      return t('validation.minLength', {
        min: issue.minimum,
      });
    }

    function handleTooBig(issue: z.core.$ZodIssueTooBig) {
      return t('validation.maxLength', {
        max: issue.maximum,
      });
    }

    function handleInvalid(
      issue: z.core.$ZodIssueInvalidType | z.core.$ZodIssueInvalidValue,
    ) {
      if (isEmpty(issue.input)) {
        return t('validation.required');
      }

      console.error('Unknown Invalid Zod issue:', issue);
    }
  };
