import { UserSchema, UserListSchema } from 'src/models/user.model';
import { httpClient } from '../libraries/http.library';

const client = httpClient();

const services = {
  dataGET: async (id: number) => {
    return client.get(`/users/${id}`, {}, UserSchema);
  },

  listGET: async () => {
    return client.get('/users', {}, UserListSchema);
  },
};

export default services;
