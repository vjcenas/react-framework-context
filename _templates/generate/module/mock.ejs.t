---
to: src/models/mocks/<%= h.changeCase.paramCase(name) %>.mock.ts
---

import faker from 'faker';
import { I<%= h.changeCase.pascal(name) %> } from '../<%= h.changeCase.paramCase(name) %>.model';

export const <%= h.changeCase.camel(name) %>Mock = (data: Partial<I<%= h.changeCase.pascal(name) %>> = {}): I<%= h.changeCase.pascal(name) %> => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  createdAt: faker.date.past(),
  createdBy: faker.name.findName(),
  updatedAt: faker.random.arrayElement([faker.date.recent(), undefined]),
  updatedBy: faker.random.arrayElement([faker.name.findName(), undefined]),
  ...data,
});
