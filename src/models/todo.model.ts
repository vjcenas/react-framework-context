import yup from 'src/libraries/validator.library';

export const TodoSchema = yup.object({
  userId: yup.number().required(),
  id: yup.number().required(),
  title: yup.string(),
  completed: yup.boolean(),
});

export const TodoListSchema = yup.array().of(TodoSchema.clone());

export type ITodo = yup.InferType<typeof TodoSchema>;
