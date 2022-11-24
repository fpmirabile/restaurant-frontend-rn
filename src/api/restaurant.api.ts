import {
  authenticatedGet,
  authenticatedPost,
  authenticatedPut,
} from './config/calls';

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
  state: string;
  openDays: OpenDays[];
  images: string[];
  lat: number;
  lon: number;
} & Pick<Restaurant, 'name'>;

const getRestaurants = (): Promise<Restaurant[]> => {
  return authenticatedGet('/restaurants');
};

const putFavorite = (restaurantId: number): Promise<any> => {
  return authenticatedPut('/restaurant/' + restaurantId + '/favorites');
};

const getRestaurantsNearMe = (
  lat: number,
  lon: number,
  distance: number = 80,
): Promise<Restaurant[]> => {
  //Dejo clavado el 80, pero ahi deberia ir la distancia que filtra el usuario
  return authenticatedGet(`/restaurants/near/${lat}/${lon}/${distance}`);
};

export interface Comment {
  date: Date;
  name: string;
  comment: string;
  stars: number;
  photo: string | null | undefined;
}
export interface FullRestaurant extends Restaurant {
  categories: Category[];
  comments: Comment[];
}
const getSingleRestaurant = async (id: number): Promise<FullRestaurant> => {
  return authenticatedGet(`/restaurant/${id}`);
};

const createRestaurant = async (restaurant: RestaurantCreate): Promise<any> => {
  return authenticatedPost('/restaurant', restaurant);
};

interface EditRestaurant extends RestaurantCreate {}
const editRestaurant = async (
  id: number,
  restaurant: EditRestaurant,
): Promise<any> => {
  return authenticatedPut(`/restaurant/${id}`, restaurant);
};

type MenuCreate = {
  name: string;
  price: number;
  images: string[];
  ingredients: string[];
  suitableVegan: boolean;
  suitableCeliac: boolean;
};

const createMenu = async (category: string, menu: MenuCreate): Promise<any> => {
  return authenticatedPost(`/restaurant/category/${category}/meal`, menu);
};

export type ItemsCategory = {
  images: string[];
  ingredients: string[];
  id: number;
  name: string;
  price: number;
  suitableVegan: boolean;
  suitableCeliac: boolean;
};

export type Category = {
  id: number;
  name: string;
  items: ItemsCategory[];
};
const getRestaurantCategories = async (id: number): Promise<Category[]> => {
  return authenticatedGet(`/restaurant/${id}/categories`);
};

const getFavorites = async (): Promise<Restaurant[]> => {
  return authenticatedGet('/restaurants/favorites');
};

const createNewCategory = async (
  restaurantId: number,
  categoryName: string,
): Promise<any> => {
  return authenticatedPost(`/restaurant/${restaurantId}/category`, {
    name: categoryName,
  });
};

export const RestaurantAPI = {
  getRestaurants,
  getRestaurantsNearMe,
  getSingleRestaurant,
  createRestaurant,
  createMenu,
  getRestaurantCategories,
  getFavorites,
  putFavorite,
  editRestaurant,
  createNewCategory,
};
