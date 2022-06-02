---
to: src/models/<%= h.changeCase.paramCase(name) %>.model.ts
---

import yup from 'src/libraries/validator.library';

export const <%= h.changeCase.pascal(name) %>Shape = {
  id: yup.number().required(),
  name: yup.string().required(),
  updatedAt: yup.date(),
  updatedBy: yup.string(),
  createdAt: yup.date(),
  createdBy: yup.string(),
};

export const <%= h.changeCase.pascal(name) %>Schema = yup.object(<%= h.changeCase.pascal(name) %>Shape);

export const <%= h.changeCase.pascal(name) %>FormSchema = yup.object({
  name: yup.string().required().default(''),
  updatedBy: yup.string().nullable(),
  createdBy: yup.string().nullable(),
});

export const <%= h.changeCase.pascal(name) %>ListPayloadSchema = yup.object({
  count: yup.number().defined(),
  rows: yup.array().of(<%= h.changeCase.pascal(name) %>Schema.clone()),
});

export const <%= h.changeCase.pascal(name) %>PayloadSchema = yup.object({
  <%= h.changeCase.camel(name) %>: <%= h.changeCase.pascal(name) %>Schema.clone(),
});

export const <%= h.changeCase.pascal(name) %>DeletePayloadSchema = yup.object({
  success: yup.boolean().required(),
});

export type I<%= h.changeCase.pascal(name) %> = yup.Asserts<typeof <%= h.changeCase.pascal(name) %>Schema>;
export type I<%= h.changeCase.pascal(name) %>Form = yup.Asserts<typeof <%= h.changeCase.pascal(name) %>FormSchema>;
