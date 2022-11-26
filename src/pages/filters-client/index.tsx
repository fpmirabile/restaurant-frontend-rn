import * as React from 'react';
import { View } from 'react-native';
import {
  ColorfulButton,
  ScrollPage,
  Headline5,
  Headline6,
  Dropdown,
  ImageButton,
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
  const [selectedFromPriceRange, setFromPriceRange] = React.useState<
    string | undefined
  >(currentFilters.priceRangeFrom);
  const [selectedToPriceRange, setToPriceRange] = React.useState<
    string | undefined
  >(currentFilters.priceRangeTo);
  const [selectedDistance, setDistance] = React.useState<number>(
    currentFilters.distance || 50,
  );

  return {
    selectedDistance,
    selectedFoodType,
    selectedFromPriceRange,
    selectedToPriceRange,
    selectedStars,
    setStars,
    setFromPriceRange,
    setToPriceRange,
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
    selectedFromPriceRange,
    selectedToPriceRange,
    selectedStars,
    setDistance,
    setFromPriceRange,
    setToPriceRange,
    setFoodType,
    setStars,
  } = useFilter(filters);

  const foodTypes = [
    { key: '1', value: 'Árabe' },
    { key: '2', value: 'Asiática' },
    { key: '3', value: 'China' },
    { key: '4', value: 'Francesa' },
    { key: '5', value: 'Hamburgueseria' },
    { key: '6', value: 'India' },
    { key: '7', value: 'Parrillla' },
    { key: '8', value: 'Pastas' },
    { key: '9', value: 'Pizzería' },
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
    (field: 'from' | 'to') => (value: string) => {
      if (field === 'from') {
        setFromPriceRange(value);
      } else {
        setToPriceRange(value);
      }
    },
    [setFromPriceRange, setToPriceRange],
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
        priceRangeFrom: selectedFromPriceRange,
        priceRangeTo: selectedToPriceRange,
      }),
    );

    navigation.goBack();
  }, [
    dispatch,
    selectedDistance,
    selectedFoodType,
    selectedFromPriceRange,
    selectedToPriceRange,
    selectedStars,
    navigation,
  ]);

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
            {localizedStrings.restaurant.clientFilters.pricerange}
          </Headline6>
        </View>
        <View style={styles.priceRange}>
          <Dropdown
            placeholder={localizedStrings.restaurant.clientFilters.from}
            onValueChanged={handlePriceRange('from')}
            data={priceRange}
            defaultPair={priceRange.find(
              range => range.value === selectedFromPriceRange,
            )}
          />
          <Dropdown
            placeholder={localizedStrings.restaurant.clientFilters.to}
            onValueChanged={handlePriceRange('to')}
            data={priceRange}
            defaultPair={priceRange.find(
              range => range.value === selectedToPriceRange,
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
            placeholder={localizedStrings.restaurant.clientFilters.starsnumber}
            onValueChanged={handleStarsSelected}
            data={stars}
            defaultPair={stars.find(
              star => star.value.length === selectedStars,
            )}
          />
        </View>
        <View style={styles.applyFilter}>
          <ColorfulButton
            buttonContainerStyle={styles.newDishButton}
            title={localizedStrings.restaurant.clientFilters.applyfilters}
            onPress={handleFilterRestaurants}
          />
        </View>
      </ScrollPage>
    </View>
  );
}
