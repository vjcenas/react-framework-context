import LocalizedStrings from 'react-localization';
import English from './en';
import Japanese from './ja';
import Tagalog from './tl';

const LangConsts = {
  en: {
    ...English,
  } as const,
  ja: {
    ...Japanese,
  } as const,
  tl: {
    ...Tagalog,
  },
} as const;

const Lang = new LocalizedStrings(LangConsts);

export default Lang;
