import yup from 'src/libraries/validator.library';

export const UserSchema = yup
  .object({
    id: yup.number(),
    name: yup.string(),
    username: yup.string(),
    email: yup.string(),
    age: yup.number().default(0),
    address: yup
      .object({
        street: yup.string(),
        suite: yup.string(),
        city: yup.string(),
        zipcode: yup.string(),
        geo: yup
          .object({
            lat: yup.string(),
            lng: yup.string(),
          })
          .defined(),
      })
      .defined(),
    phone: yup.string(),
    website: yup.string(),
    company: yup
      .object({
        name: yup.string(),
        catchPhrase: yup.string(),
        bs: yup.string(),
      })
      .defined(),
  })
  .defined();

export const UserListSchema = yup.array().of(UserSchema).defined();

export type IUser = yup.InferType<typeof UserSchema>;
