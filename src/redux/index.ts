import { restaurantSlice } from './reducers/restaurant-temp/slice';
import { userSlice } from './reducers/user/slice';

const actions = {
  userActions: userSlice.actions,
  restaurantTemp: restaurantSlice.actions,
};

export { store } from './store';
export { actions };
