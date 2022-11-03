import { restaurantSlice } from './reducers/restaurant/slice';
import { userSlice } from './reducers/user/slice';

const actions = {
  userActions: userSlice.actions,
  restaurants: restaurantSlice.actions,
};

export { store } from './store';
export { actions };
