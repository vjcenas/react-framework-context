import LocalizedStrings from 'react-localization';
import English from './en';
import Japanese from './ja';

const Lang = new LocalizedStrings({
  en: {
    ...English,
  } as const,
  ja: {
    ...English,
    ...Japanese,
  } as const,
} as const);

export default Lang;
