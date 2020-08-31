import faker from 'faker';
import { IUser } from 'src/models/user.model';

export const userMock = (): IUser => {
  return {
    id: faker.random.number(),
    name: 'test',
    username: faker.internet.userName(),
    address: {
      geo: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
    },
    company: {
      name: faker.company.companyName(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.bs(),
    },
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    website: faker.internet.domainName(),
  };
};
