import { userSlice } from './reducers/user/slice';

const actions = {
  userActions: userSlice.actions,
};

export { store } from './store';
export { actions };
