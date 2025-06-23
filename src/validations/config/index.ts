import { z } from 'zod/v4';
import { ComposerTranslation as I18nComposerTranslation } from 'vue-i18n';

import { customZodErrorsHandler } from "./errors/customZodErrorsHandler";

export const configureZod = ({ zodInstance, t }: {
    t: I18nComposerTranslation;
    zodInstance?: typeof z;
}) => {
    const configuredZod = zodInstance || z;

    configuredZod.config({
        customError: customZodErrorsHandler(t),
    });
};

