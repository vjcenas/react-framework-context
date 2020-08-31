import * as yup from 'yup';
import Lang from './languages';

yup.setLocale({ mixed: { required: Lang.MSG_VALIDATION_ERROR_REQUIRED } });

export default yup;
