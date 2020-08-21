import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
//data
import enData from './languages/en-us';
import viData from './languages/vi-vn';

const options = {
    // order and from where user language should be detected
    order: ['localStorage',],

    // keys or params to lookup language from
    lookupLocalStorage: 'i18nextLng',

    // cache user language on
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'],

    cookieMinutes: 10,
    cookieDomain: 'myDomain',
}

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: enData
        },
        vi: {
            translations: viData
        }
    },
    fallbackLng: 'vi',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ','
    },

    react: {
        wait: true
    },
    detection: options
});

export default i18n;