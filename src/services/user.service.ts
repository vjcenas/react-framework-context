import Axios from 'axios';

const services = {
  dataGET: async () => {
    return Axios.get('/users');
  },
};

export default services;
