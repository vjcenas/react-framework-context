import faker from 'faker';
import { IUser } from 'src/models/user.model';

export const userMock = (): IUser => {
  return {
    id: faker.random.number(),
    name: faker.name.findName(),
    username: faker.internet.userName(),
    age: faker.random.number(),
    address: {
      city: faker.address.city(),
      street: faker.address.streetAddress(),
      zipcode: faker.address.zipCode(),
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
