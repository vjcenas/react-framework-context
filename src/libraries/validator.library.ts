import * as yup from 'yup';
import { ObjectSchema } from 'yup/lib';
import Lang from './languages';

yup.setLocale({ mixed: { required: Lang.MSG_VALIDATION_ERROR_REQUIRED } });

yup.addMethod<ObjectSchema<any, any, any, any>>(
  yup.object,
  'optionalContent',
  // eslint-disable-next-line func-names
  function (isOptional = true, defaultValue = undefined) {
    return this.transform((_, value) => {
      if (!isOptional) {
        return value;
      }

      if (
        value &&
        defaultValue === undefined &&
        Object.values(value).some(
          (v) => !(v === null || v === undefined || v === '')
        )
      ) {
        return value;
      }

      return defaultValue;
    }).default(defaultValue);
  }
);

declare module 'yup' {
  interface ObjectSchema<TShape, TContext, TIn, TOut> {
    optionalContent(
      this: ObjectSchema<TShape, TContext, TIn, TOut>,
      isOptional?: boolean,
      defaultValue?: TOut | null
    ): ObjectSchema<TShape, TContext, TIn, TOut | undefined>;
  }
}

export default yup;
