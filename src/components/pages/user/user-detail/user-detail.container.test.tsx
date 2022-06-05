import React from 'react';
import { duckActions, userActionTypes } from 'src/ducks/user.duck';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import App from 'src/app';
import history from 'src/history';
import { userMock } from 'src/models/mocks/user.mock';
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
    const spy = jest.spyOn(duckActions.dataGET, 'service');

    await act(async () => {
      await mount(
        <MemoryRouter>
          <App>
            <UserDetailContainer
              location={history.location}
              history={history}
              match={{ params: { id: '1' }, isExact: true, path: '', url: '' }}
            />
          </App>
        </MemoryRouter>
      );
    });

    expect(spy).toBeCalled();
  });

  it('should display data', async () => {
    const data = userMock();
    let wrapper = mount(<div />);

    jest
      .spyOn(duckActions.dataGET, 'service')
      .mockImplementationOnce(() => Promise.resolve(data));

    await act(async () => {
      wrapper = await mount(
        <MemoryRouter>
          <App>
            <UserDetailContainer
              location={history.location}
              history={history}
              match={{ params: { id: '1' }, isExact: true, path: '', url: '' }}
            />
          </App>
        </MemoryRouter>
      );
    });

    // Update component with new state data
    wrapper.update();

    expect(wrapper.find('h1').text()).toEqual(data.name);
  });

  it('should call dataGET', async () => {
    const data = userMock();

    const service = jest
      .spyOn(duckActions.dataGET, 'service')
      .mockImplementationOnce(() => Promise.resolve(data));

    await act(async () => {
      await mount(
        <MemoryRouter>
          <App>
            <UserDetailContainer
              location={history.location}
              history={history}
              match={{ params: { id: '1' }, isExact: true, path: '', url: '' }}
            />
          </App>
        </MemoryRouter>
      );
    });

    expect(service).toBeCalledTimes(1);
  });

  it('should call addAge', async () => {
    const data = userMock();
    let wrapper = mount(<div />);

    jest
      .spyOn(duckActions.dataGET, 'service')
      .mockImplementationOnce(() => Promise.resolve(data));

    const addAge = jest
      .spyOn(duckActions, 'addAge')
      .mockImplementationOnce(() => ({
        type: userActionTypes.USER_ADD_AGE,
        payload: 2,
      }));

    await act(async () => {
      wrapper = await mount(
        <MemoryRouter>
          <App>
            <UserDetailContainer
              location={history.location}
              history={history}
              match={{ params: { id: '1' }, isExact: true, path: '', url: '' }}
            />
          </App>
        </MemoryRouter>
      );
    });

    // Update component with new state data
    wrapper.update();

    act(() => {
      wrapper.find('button').simulate('click');
    });

    expect(addAge).toBeCalledTimes(1);
  });
});
