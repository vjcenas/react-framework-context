---
to: src/services/<%= h.changeCase.paramCase(name) %>.service.ts
---

import { httpClient } from 'src/libraries/http.library';
import {
  I<%= h.changeCase.pascal(name) %>Form,
  <%= h.changeCase.pascal(name) %>ListPayloadSchema,
  <%= h.changeCase.pascal(name) %>DeletePayloadSchema,
  <%= h.changeCase.pascal(name) %>PayloadSchema,
} from 'src/models/<%= h.changeCase.paramCase(name) %>.model';

const client = httpClient();
const endpoint = '<%= h.changeCase.camel(name) %>';

const services = {
  dataGET: async (id: number) => {
    return client.get(`/${endpoint}/${id}`, {}, <%= h.changeCase.pascal(name) %>PayloadSchema);
  },

  listGET: async () => {
    return client.get(`/${endpoint}`, {}, <%= h.changeCase.pascal(name) %>ListPayloadSchema);
  },

  createPOST: async (data: I<%= h.changeCase.pascal(name) %>Form) => {
    return client.post(`/${endpoint}`, data, <%= h.changeCase.pascal(name) %>PayloadSchema);
  },

  updatePUT: async (id: number, data: I<%= h.changeCase.pascal(name) %>Form) => {
    return client.put(`/${endpoint}/${id}`, data, <%= h.changeCase.pascal(name) %>PayloadSchema);
  },

  dataDELETE: async (id: number) => {
    return client.delete(`/${endpoint}/${id}`, <%= h.changeCase.pascal(name) %>DeletePayloadSchema);
  },
};

export default services;
