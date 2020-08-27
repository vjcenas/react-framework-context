import services from '../services/user.service';

export const actionTypes = {
  USER_GET_DATA: 'USER_GET_DATA',
} as const;

const asyncActions = {
  dataGET: {
    type: actionTypes.USER_GET_DATA,
    service: services.dataGET,
  },
};
