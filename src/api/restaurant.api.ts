import { authenticatedGet, authenticatedPost } from './config/calls';

export type Days = 'L' | 'M' | 'X' | 'J' | 'V' | 'S' | 'D';

type OpenDays = {
  day: Days;
  openTime: string;
  closeTime: string;
  open: boolean;
};

export type Restaurant = {
  id: number;
  name: string;
  lat: string;
  lon: string;
  ownerId: number;
  address: string;
  isClosed: boolean;
  stars: number;
  favorite: boolean;
  openDays?: OpenDays[];
  photos: string[];
};

type RestaurantCreate = {
  street: string;
  streetNumber: string;
  place: string;
  locality: string;
  state: string;
  openDays: OpenDays[];
  images: string[];
  lat: number;
  lon: number;
} & Pick<Restaurant, 'name'>;

const getRestaurants = (): Promise<Restaurant[]> => {
  return authenticatedGet('/restaurants');
};

const createRestaurant = (restaurant: RestaurantCreate): Promise<any> => {
  return authenticatedPost('/restaurant', restaurant);
};

type MenuCreate = {
  name: string;
  price: number;
  images: string[];
  ingredients: string[];
  suitableVegan: boolean;
  suitableCeliac: boolean;
};

const createMenu = (category: string, menu: MenuCreate): Promise<any> => {
  return authenticatedPost(`/restaurant/category/${category}/meal`, menu);
};

export const RestaurantAPI = {
  getRestaurants,
  createRestaurant,
  createMenu,
};
