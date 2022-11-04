import * as React from 'react';
import { View } from 'react-native';
import {
  Caption,
  Headline6,
  ImagePicker,
  Input,
} from '../../../../components/shared';
import { OpeningList } from '../../../../components/shared/opening-list';
import { localizedStrings } from '../../../../localization/localized-strings';
import { actions } from '../../../../redux';
import { StepTwoFields } from '../../../../redux/reducers/restaurant/slice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { styles } from './styles';

interface PropTypes {}

export function CreateRestaurantStepTwo({}: PropTypes) {
  const dispatch = useAppDispatch();
  const { images, priceRange, times, typeOfFood } = useAppSelector(
    state => state.restaurant.create.stepTwo,
  );

  const handleChangeValue = React.useCallback(
    (field: keyof StepTwoFields) => (value: any) => {
      console.log('test', value, value[field]);
      dispatch(
        actions.restaurants.onUpdateStepTwo({
          images,
          times,
          typeOfFood,
          priceRange,
          [field]: value,
        }),
      );
    },
    [dispatch, images, priceRange, typeOfFood, times],
  );

  return (
    <View>
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.kindOfFoodAndRange}
      </Headline6>
      <Input
        onChangeText={handleChangeValue('typeOfFood')}
        containerStyles={styles.foodTypeInput}
        placeholder={localizedStrings.restaurant.create.kindOfFood}
        value={typeOfFood}
      />
      <Input
        onChangeText={handleChangeValue('priceRange')}
        containerStyles={styles.priceRangeInput}
        placeholder={localizedStrings.restaurant.create.priceRange}
        value={priceRange}
      />
      <OpeningList
        previousDates={times}
        onOpenDaysChanged={handleChangeValue('times')}
      />
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.restaurantPictures}
      </Headline6>
      <ImagePicker
        onImageAdded={handleChangeValue('images')}
        maxAmountOfImages={5}
        previousImages={images}
      />
      <Caption>
        {localizedStrings.restaurant.create.picturesCaption(images.length, 5)}
      </Caption>
    </View>
  );
}
