import { userMock } from 'src/models/mocks/user.mock';
import { IUser } from 'src/models/user.model';
import { getDisplayName } from '../user.selector';

describe('User Selector', () => {
  it('should return an array of fullname', () => {
    const data: IUser[] = Array(2).fill(null).map(userMock);

    const result = getDisplayName(data);

    expect(result).toEqual([
      `${data[0].name} (${data[0].username})`,
      `${data[1].name} (${data[1].username})`,
    ]);
  });
});
