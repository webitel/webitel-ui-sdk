import { TranslationLocale } from '../_enums/TranslationLocale.enum';

/**
 * @author @dlohvinov
 * 
 * @description
 * These keys should not be translated to different langs,
 * but moved to separate file to avoid main lang file lines
 *  count increase related to other langs so that it's easier
 * to compare any missing translations between langs
 */

export default {
    reusable: {
    lang: {
        [TranslationLocale.en]: 'English',
        [TranslationLocale.es]: 'Español',
        [TranslationLocale.ru]: 'Русский',
        [TranslationLocale.uk]: 'Українська',
        [TranslationLocale.kz]: 'Қазақ',
        [TranslationLocale.vi]: 'Tiếng Việt',
        [TranslationLocale.pl]: 'Polski',
        [TranslationLocale.ro]: 'Română',
        [TranslationLocale.uz]: "O'zbek",
      },
    },
};