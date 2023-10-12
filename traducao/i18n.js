// i18n.js
import I18n from 'i18n-js';

import en from './locales/en'; // Importe as traduções para o inglês
import pt from './locales/pt'; // Importe as traduções para o português

I18n.fallbacks = true;

I18n.translations = {
  en,
  pt,
};

I18n.locale = 'pt';

export default I18n;
