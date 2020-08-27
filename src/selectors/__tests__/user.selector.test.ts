import { getFullnames } from '../user.selector';

describe('User Selector', () => {
  it('should return an array of fullname', () => {
    const data = [
      {
        first_name: 'Juan',
        last_name: 'Dela Cruz',
        birth_date: '2000-12-12',
        country: 'Philippines',
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        birth_date: '2005-11-11',
        country: 'USA',
      },
    ];

    const result = getFullnames(data);

    expect(result).toEqual(['Juan Dela Cruz', 'Jane Doe']);
  });
});
