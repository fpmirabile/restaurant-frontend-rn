import { authenticatedGet, authenticatedPost } from './config/calls';

type Days =
  | 'Lunes'
  | 'Martes'
  | 'Miercoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sabado'
  | 'Domingo';
export type Restaurant = {
  id: number;
  name: string;
  lat: string;
  lon: string;
  ownerId: number;
  address: string;
  isClosed: boolean;
};

type RestaurantCreate = {
  street: string;
  streetNumber: string;
  neighborhood: string;
  locality: string;
  state: string;
  openDays: Days[];
  openTime: string;
  closeTime: string;
} & Pick<Restaurant, 'name' | 'lat' | 'lon'>;

const getRestaurants = (): Promise<Restaurant[]> => {
  return authenticatedGet('/restaurants');
};

const createRestaurant = (restaurant: RestaurantCreate): Promise<void> => {
  return authenticatedPost('/restaurants', restaurant);
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
  return authenticatedPost(`/restaurants/categories/${category}/meals`, menu);
};

export const RestaurantAPI = {
  getRestaurants,
  createRestaurant,
  createMenu,
};
