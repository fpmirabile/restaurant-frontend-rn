import { authenticatedGet, authenticatedPost } from './config/calls';

export type Days = 'L' | 'M' | 'X' | 'J' | 'V' | 'S' | 'D';

export type OpenDays = {
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
  foodType: string;
  priceRange: string;
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

const getRestaurantsNearMe = (
  lat: number,
  lon: number,
): Promise<Restaurant[]> => {
  return authenticatedGet(`/restaurants/near/${lat}/${lon}`);
};

const getSingleRestaurant = (id: number): Promise<Restaurant> => {
  return authenticatedGet(`/restaurant/${id}`);
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

const getFavorites = (): Promise<Restaurant[]> => {
  return authenticatedGet('/restaurants');
};

export const RestaurantAPI = {
  getRestaurants,
  getRestaurantsNearMe,
  getSingleRestaurant,
  createRestaurant,
  createMenu,
  getFavorites,
};
