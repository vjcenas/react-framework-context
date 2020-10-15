import React from 'react';
import { asyncActions } from 'src/ducks/user.duck';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { UserProvider } from 'src/contexts';
import { IUser } from 'src/models/user.model';
import { userMock } from 'src/services/mocks/user.mock';
import { mocked } from 'ts-jest/utils';
import { MemoryRouter } from 'react-router-dom';
import UserListContainer from './user-list.container';

describe('UserContainer', () => {
  it('should call dataGET', async () => {
    const spy = jest.spyOn(asyncActions.listGET, 'service');

    await act(async () => {
      await mount(
        <MemoryRouter>
          <UserProvider>
            <UserListContainer />
          </UserProvider>
        </MemoryRouter>
      );
    });

    expect(spy).toBeCalled();
  });

  it('should display data', async () => {
    const data: IUser[] = new Array(5).fill(null).map(() => userMock());

    let wrapper = mount(<div />);

    mocked(asyncActions.listGET.service).mockImplementationOnce(() =>
      Promise.resolve(data)
    );

    await act(async () => {
      wrapper = await mount(
        <MemoryRouter>
          <UserProvider>
            <UserListContainer />
          </UserProvider>
        </MemoryRouter>
      );
    });

    wrapper.update();

    expect(wrapper.find('table > tbody > tr')).toHaveLength(data.length);
  });
});
