import { TodoSchema, TodoListSchema } from 'src/models/todo.model';
import { httpClient } from 'src/libraries/http.library';

const client = httpClient();

const services = {
  dataGET: async (id: number) => {
    return client.get(`/todos/${id}`, {}, TodoSchema);
  },

  listGET: async () => {
    return client.get('/todos', {}, TodoListSchema);
  },

  listByUserIdGET: async (userId) => {
    return client.get(`/todos?userId=${userId}`, {}, TodoListSchema);
  },
};

export default services;
