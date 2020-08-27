import { httpClient } from '../libraries/http.library';
import yup from '../libraries/validator.library';

const client = httpClient();

const services = {
  dataGET: async () => {
    return client.get('/users', {}, yup.mixed());
  },
};

export default services;
