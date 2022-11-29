import * as React from 'react';
import { View } from 'react-native';
import {
  ColorfulButton,
  ScrollPage,
  Headline5,
  Headline6,
  Dropdown,
  ImageButton,
  TouchableText,
} from '../../components/shared';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { localizedStrings } from '../../localization/localized-strings';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ICONS } from '../../constants';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions } from '../../redux';
import { Filter } from '../../api/restaurant.api';

interface RouterProps extends MorfandoRouterParams<'FiltersClient'> {}

function useFilter(currentFilters: Filter & { distance?: number }) {
  const [selectedStars, setStars] = React.useState<number | undefined>(
    currentFilters.stars,
  );
  const [selectedFoodType, setFoodType] = React.useState<string | undefined>(
    currentFilters.foodType,
  );
  const [selectedPriceRange, setPriceRange] = React.useState<
    string | undefined
  >(currentFilters.priceRange);
  const [selectedDistance, setDistance] = React.useState<number>(
    currentFilters.distance || 50,
  );

  return {
    selectedDistance,
    selectedFoodType,
    selectedPriceRange,
    selectedStars,
    setStars,
    setPriceRange,
    setDistance,
    setFoodType,
  };
}

export function FiltersClient({ navigation }: RouterProps) {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.restaurant);
  const {
    selectedDistance,
    selectedFoodType,
    selectedPriceRange,
    selectedStars,
    setDistance,
    setPriceRange,
    setFoodType,
    setStars,
  } = useFilter(filters);

  const foodTypes = [
    { key: '1', value: 'Parrilla' },
    { key: '2', value: 'Asiática' },
    { key: '3', value: 'Pastas' },
    { key: '4', value: 'Hamburguesería' },
    { key: '5', value: 'India' },
    { key: '6', value: 'Árabe' },
    { key: '7', value: 'China' },
    { key: '8', value: 'Pizzería' },
    { key: '9', value: 'Francesa' },
  ];

  const stars = [
    { key: '1', value: '⭐' },
    { key: '2', value: '⭐⭐' },
    { key: '3', value: '⭐⭐⭐' },
    { key: '4', value: '⭐⭐⭐⭐' },
    { key: '5', value: '⭐⭐⭐⭐⭐' },
  ];

  const priceRange = [
    { key: '1', value: '$' },
    { key: '2', value: '$$' },
    { key: '3', value: '$$$' },
    { key: '4', value: '$$$$' },
    { key: '5', value: '$$$$$' },
  ];

  const handleSliderScrollEnd = React.useCallback(
    (values: number[]) => {
      const currentValue = values[0];
      if (currentValue) {
        setDistance(currentValue);
      }
    },
    [setDistance],
  );

  const handleFoodTypeChange = React.useCallback(
    (value: string) => {
      setFoodType(value);
    },
    [setFoodType],
  );

  const handlePriceRange = React.useCallback(
    (value: string) => {
      setPriceRange(value);
    },
    [setPriceRange],
  );

  const handleStarsSelected = React.useCallback(
    (value: string) => {
      setStars(value.length);
    },
    [setStars],
  );

  const backToHome = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleFilterRestaurants = React.useCallback(() => {
    dispatch(
      actions.restaurants.filterRestaurantsByQuery({
        foodType: selectedFoodType,
        distance: selectedDistance,
        stars: selectedStars,
        priceRange: selectedPriceRange,
      }),
    );

    navigation.goBack();
  }, [
    dispatch,
    selectedDistance,
    selectedFoodType,
    selectedPriceRange,
    selectedStars,
    navigation,
  ]);

  const handleCleanFilters = React.useCallback(async () => {
    await dispatch(actions.restaurants.cleanFilters());
    dispatch(actions.restaurants.getNearRestaurants());
    navigation.goBack();
  }, [dispatch, navigation]);

  return (
    <View style={styles.containerView}>
      <ScrollPage internalContainerStyles={styles.container}>
        <View style={styles.close}>
          <ImageButton onPress={backToHome} imageSvg={ICONS.closeIcon} />
        </View>
        <View style={styles.title}>
          <Headline5 darkPinkColor>
            {localizedStrings.restaurant.clientFilters.filter}
          </Headline5>
        </View>
        <View style={styles.subtitle}>
          <Headline6>
            {localizedStrings.restaurant.clientFilters.maxDistance}
          </Headline6>
        </View>
        <View style={styles.containerSlider}>
          <MultiSlider
            onValuesChangeFinish={handleSliderScrollEnd}
            selectedStyle={styles.slider}
            unselectedStyle={styles.sliderUnselected}
            markerStyle={styles.sliderButton}
            pressedMarkerStyle={styles.sliderButtonSelected}
            min={1}
            max={50}
            values={[selectedDistance]}
            sliderLength={328}
            enableLabel={true}
          />
        </View>
        <View style={styles.subtitle}>
          <Headline6>
            {localizedStrings.restaurant.clientFilters.foodType}
          </Headline6>
        </View>
        <View>
          <Dropdown
            placeholder={localizedStrings.restaurant.clientFilters.foodType}
            onValueChanged={handleFoodTypeChange}
            data={foodTypes}
            defaultPair={foodTypes.find(
              food => food.value === selectedFoodType,
            )}
          />
        </View>
        <View style={styles.subtitle}>
          <Headline6>
            {localizedStrings.restaurant.clientFilters.priceRange}
          </Headline6>
        </View>
        <View>
          <Dropdown
            placeholder={localizedStrings.restaurant.clientFilters.priceRanges}
            onValueChanged={handlePriceRange}
            data={priceRange}
            defaultPair={priceRange.find(
              range => range.value === selectedPriceRange,
            )}
          />
        </View>
        <View style={styles.subtitle}>
          <Headline6>
            {localizedStrings.restaurant.clientFilters.calification}
          </Headline6>
        </View>
        <View>
          <Dropdown
            placeholder={localizedStrings.restaurant.clientFilters.starsNumber}
            onValueChanged={handleStarsSelected}
            data={stars}
            defaultPair={stars.find(
              star => star.value.length === selectedStars,
            )}
          />
        </View>
        <View style={styles.applyFilter}>
          <TouchableText
            type="captionDarkPink"
            message={localizedStrings.restaurant.clientFilters.cleanFilters}
            onPress={handleCleanFilters}
          />
          <ColorfulButton
            buttonContainerStyle={styles.newDishButton}
            title={localizedStrings.restaurant.clientFilters.applyFilters}
            onPress={handleFilterRestaurants}
          />
        </View>
      </ScrollPage>
    </View>
  );
}
