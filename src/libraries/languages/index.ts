import LocalizedStrings from 'react-localization';
import English from './en';
import Japanese from './ja';

const LangConsts = {
  en: {
    ...English,
  } as const,
  ja: {
    ...Japanese,
  } as const,
} as const;

const Lang = new LocalizedStrings(LangConsts);

export default Lang;
