import React from 'react';
import { asyncActions } from 'src/ducks/user.duck';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { UserProvider } from 'src/contexts';
import history from 'src/history';
import { userMock } from 'src/services/mocks/user.mock';
import { MemoryRouter } from 'react-router-dom';
import UserDetailContainer from './user-detail.container';

describe('UserContainer', () => {
  beforeEach(() => {
    /**
     * Restores all mocks back to their original value
     * Only works when the mock was created with jest.spyOn
     *
     * @reference https://jestjs.io/docs/en/jest-object#jestrestoreallmocks
     */
    jest.restoreAllMocks();
  });

  it('should call dataGET', async () => {
    const spy = jest.spyOn(asyncActions.dataGET, 'service');

    await act(async () => {
      await mount(
        <MemoryRouter>
          <UserProvider>
            <UserDetailContainer
              location={history.location}
              history={history}
              match={{ params: { id: '1' }, isExact: true, path: '', url: '' }}
            />
          </UserProvider>
        </MemoryRouter>
      );
    });

    expect(spy).toBeCalled();
  });

  it('should display data', async () => {
    const data = userMock();
    let wrapper = mount(<React.Fragment />);

    jest
      .spyOn(asyncActions.dataGET, 'service')
      .mockImplementationOnce(() => Promise.resolve(data));

    await act(async () => {
      wrapper = await mount(
        <MemoryRouter>
          <UserProvider>
            <UserDetailContainer
              location={history.location}
              history={history}
              match={{ params: { id: '1' }, isExact: true, path: '', url: '' }}
            />
          </UserProvider>
        </MemoryRouter>
      );
    });

    // Update component with new state data
    wrapper.update();

    expect(wrapper.find('h1').text()).toEqual(data.name);
  });

  it('should call addAge', async () => {
    const data = userMock();
    let wrapper = mount(<React.Fragment />);

    const sevice = jest
      .spyOn(asyncActions.dataGET, 'service')
      .mockImplementationOnce(() => Promise.resolve(data));

    await act(async () => {
      wrapper = await mount(
        <MemoryRouter>
          <UserProvider>
            <UserDetailContainer
              location={history.location}
              history={history}
              match={{ params: { id: '1' }, isExact: true, path: '', url: '' }}
            />
          </UserProvider>
        </MemoryRouter>
      );
    });

    // Update component with new state data
    wrapper.update();

    act(() => {
      wrapper.find('button').simulate('click');
    });

    expect(sevice).toBeCalledTimes(1);
  });
});
