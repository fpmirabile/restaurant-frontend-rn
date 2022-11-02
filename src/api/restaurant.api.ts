import { authenticatedGet } from './config/calls';

export interface Restaurant {
  id: number;
  name: string;
  lat: string;
  lon: string;
  ownerId: number;
  address: string;
}

const getRestaurants = (): Promise<Restaurant[]> => {
  return authenticatedGet('/restaurants');
};

export const RestaurantAPI = {
  getRestaurants,
};
