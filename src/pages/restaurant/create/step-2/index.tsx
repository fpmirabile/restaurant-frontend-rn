import * as React from 'react';
import { View } from 'react-native';
import {
  Caption,
  Dropdown,
  Headline6,
  ImagePicker,
  OpeningList,
} from '../../../../components/shared';
import { localizedStrings } from '../../../../localization/localized-strings';
import { actions, StepTwoFields } from '../../../../redux';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { atLeastOneSelected } from '../../../../util/validation';
import { styles } from './styles';

interface PropTypes {}
export function CreateRestaurantStepTwo({}: PropTypes) {
  const dispatch = useAppDispatch();
  const { stepTwo } = useAppSelector(state => state.restaurant.create);

  const typeOfFoods = [
    { key: '1', value: 'Carnes' },
    { key: '2', value: 'Sushi' },
  ];

  const priceRanges = [
    { key: '1', value: '$' },
    { key: '2', value: '$$' },
    { key: '2', value: '$$$' },
    { key: '2', value: '$$$$' },
    { key: '2', value: '$$$$$' },
  ];

  const selectedTypeOfFood = typeOfFoods.find(
    t => t.value === stepTwo.typeOfFood,
  );
  const selectedPriceRange = priceRanges.find(
    p => p.value === stepTwo.priceRange,
  );
  const handleChangeValue = React.useCallback(
    (field: keyof StepTwoFields) => (value: any) => {
      dispatch(
        actions.restaurants.onUpdateStepTwo({
          ...stepTwo,
          [field]: value,
        }),
      );
    },
    [dispatch, stepTwo],
  );

  return (
    <View>
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.kindOfFoodAndRange}
      </Headline6>
      <Dropdown
        onValueChanged={handleChangeValue('typeOfFood')}
        errorMessage="Debe ingresar un tipo de comida"
        containerStyles={styles.foodTypeInput}
        defaultPair={selectedTypeOfFood}
        onValidateValue={atLeastOneSelected}
        data={typeOfFoods}
        placeholder={localizedStrings.restaurant.create.kindOfFood}
      />
      <Dropdown
        onValueChanged={handleChangeValue('priceRange')}
        containerStyles={styles.priceRangeInput}
        onValidateValue={atLeastOneSelected}
        data={priceRanges}
        errorMessage="Ingrese un rango de precios"
        placeholder={localizedStrings.restaurant.create.priceRange}
        defaultPair={selectedPriceRange}
      />
      <OpeningList
        previousDates={stepTwo.times}
        onOpenDaysChanged={handleChangeValue('times')}
      />
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.restaurantPictures}
      </Headline6>
      <ImagePicker
        onImageAdded={handleChangeValue('images')}
        maxAmountOfImages={5}
        previousImages={stepTwo.images}
      />
      <Caption>
        {localizedStrings.restaurant.create.picturesCaption(
          stepTwo.images.length,
          5,
        )}
      </Caption>
    </View>
  );
}
