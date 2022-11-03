import { memo } from 'react';
import RestaurantIcon from './assets/images/icons/restaurant-icon.svg';
import FilterIcon from './assets/images/icons/filter-icon.svg';
import BurgerIcon from './assets/images/icons/burger-icon.svg';
import EditIcon from './assets/images/icons/edit-icon.svg';
import LikeIcon from './assets/images/icons/like-icon.svg';
import Info2Icon from './assets/images/icons/info2-icon.svg';
import SignOutIcon from './assets/images/icons/signout-icon.svg';
import TrashIcon from './assets/images/icons/trash-icon.svg';
import GoogleIcon from './assets/images/icons/google-icon.svg';
import LeftChevronIcon from './assets/images/icons/chevron-left-icon.svg';
import RightChevronIcon from './assets/images/icons/chevron-right-icon.svg';
import AddImageIcon from './assets/images/icons/add-image-icon.svg';
import RemoveImageIcon from './assets/images/icons/remove-image-icon.svg';
import NotFilledLikeIcon from './assets/images/icons/not-filled-like-icon.svg';
import CloseIcon from './assets/images/icons/close-icon.svg';
import RemoveIcon from './assets/images/icons/remove-icon.svg';
import AddIcon from './assets/images/icons/add-icon.svg';

const COLORS = {
  blueSecondary: '#211D42',
  pink: '#FFB7D4',
  white: '#FFFFFF',
  black: '#000000DE',
  background: '#FAFAFA',
  darkPink: '#FB0067',
  grey:'#DCDCDC',
  shadow: '#FEBDD8',
};

const ICONS = {
  restaurant: memo(RestaurantIcon),
  filter: memo(FilterIcon),
  burgerMenu: memo(BurgerIcon),
  edit: memo(EditIcon),
  like: memo(LikeIcon),
  info2: memo(Info2Icon),
  signOut: memo(SignOutIcon),
  trash: memo(TrashIcon),
  google: memo(GoogleIcon),
  leftChevron: memo(LeftChevronIcon),
  rightChevron: memo(RightChevronIcon),
  addImage: memo(AddImageIcon),
  removeImage: memo(RemoveImageIcon),
  likeNoBackground: memo(NotFilledLikeIcon),
  closeIcon: memo(CloseIcon),
  removeIcon: memo(RemoveIcon),
};

export { COLORS, ICONS };
