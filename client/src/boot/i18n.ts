import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .use(HttpApi)
    .init({
        backend: {
            loadPath: '/locales/{{lng}}.json'
        },
        fallbackLng: 'en',
        load: 'languageOnly',
        interpolation: {
            escapeValue: false
        },
        ns: ['client'],
        defaultNS: 'client',
        detection: {
            order: ['navigator']
        }
    });

export default i18n;
