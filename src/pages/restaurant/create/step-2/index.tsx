import * as React from 'react';
import { View } from 'react-native';
import {
  Caption,
  Headline6,
  ImagePicker,
  Input,
  PressableView,
} from '../../../../components/shared';
import { OpeningList } from '../../../../components/shared/opening-list';
import { ICONS } from '../../../../constants';
import { localizedStrings } from '../../../../localization/localized-strings';
import { styles } from './styles';

interface PropTypes {}
const AddImageIcon = ICONS.addImage;
export function CreateRestaurantStepTwo({}: PropTypes) {
  return (
    <View>
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.kindOfFoodAndRange}
      </Headline6>
      <Input
        containerStyles={styles.foodTypeInput}
        placeholder={localizedStrings.restaurant.create.kindOfFood}
        value=""
      />
      <Input
        containerStyles={styles.priceRangeInput}
        placeholder={localizedStrings.restaurant.create.priceRange}
        value=""
      />
      <OpeningList />
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.restaurantPictures}
      </Headline6>
      <ImagePicker maxAmountOfImages={5} />
      <Caption>
        {localizedStrings.restaurant.create.picturesCaption(0, 5)}
      </Caption>
    </View>
  );
}
