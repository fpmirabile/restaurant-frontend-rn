import {
  restaurantSlice,
  StepOneFields,
  StepTwoFields,
} from './reducers/restaurant/slice';
import { userSlice } from './reducers/user/slice';

const actions = {
  userActions: userSlice.actions,
  restaurants: restaurantSlice.actions,
};

export { persistedStore, realStore } from './store';
export { actions };
export { type StepOneFields, type StepTwoFields };
