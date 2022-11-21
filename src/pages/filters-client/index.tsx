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
import { ICONS } from '../../constants';
import { atLeastOneSelected } from '../../util/validation';
import { styles } from './styles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface RouterProps extends MorfandoRouterParams<'FiltersClient'> {}

export function FiltersClient({ navigation }: RouterProps) {

  const categories = [
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
  ];
  const pricerange = [
    { key: '1', value: '$' },
    { key: '2', value: '$$' },
    { key: '3', value: '$$$' },
    { key: '4', value: '$$$$' },
  ];

  const [selected, setSelected] = React.useState("");

  const enableScroll = () => (value: any) => ({ scrollEnabled: true });
  const disableScroll = () => (value: any) => ({ scrollEnabled: false });

  const backToHome = React.useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);


  return (
    <View style={styles.containerView}>
      <ScrollPage internalContainerStyles={styles.container}>
        <View style={styles.close}>
          <ImageButton onPress={backToHome} imageSvg={ICONS.closeIcon} />
        </View>
        <View style={styles.title}>
          <Headline5 darkPinkColor>
            {localizedStrings.restaurant.clientFiltres.filter}
          </Headline5>
        </View>
        <View style={styles.subtilte}>
          <Headline6>
            {localizedStrings.restaurant.clientFiltres.maxdistance}
          </Headline6>
        </View>
        <View style={styles.containerSlider}>
          <MultiSlider
            onValuesChangeStart={disableScroll}
            onValuesChangeFinish={enableScroll}
            selectedStyle={styles.slider}
            unselectedStyle={styles.sliderUnselected}
            markerStyle={styles.sliderButton}
            pressedMarkerStyle={styles.sliderButtonSelected}
            min={1}
            max={35}
            sliderLength={328}
            enableLabel={true}
          />
        </View>
        <View style={styles.subtilte}>
          <Headline6>
            {localizedStrings.restaurant.clientFiltres.foodtype}
          </Headline6>
        </View>
        <View>
          <Dropdown
            placeholder={localizedStrings.restaurant.clientFiltres.foodtype}
            // onValueChanged={handleValueChanged('category')}
            data={categories}
            onValidateValue={atLeastOneSelected}
            // defaultPair={selectedCategory}
          />
        </View>
        <View style={styles.subtilte}>
          <Headline6>
            {localizedStrings.restaurant.clientFiltres.pricerange}
          </Headline6>
        </View>
        <View style={styles.priceRange}>
          <Dropdown
            placeholder={localizedStrings.restaurant.clientFiltres.from}
            // onValueChanged={handleValueChanged('category')}
            data={pricerange}
            onValidateValue={atLeastOneSelected}
            // defaultPair={selectedCategory}
          />
          <Dropdown
            placeholder={localizedStrings.restaurant.clientFiltres.to}
            // onValueChanged={handleValueChanged('category')}
            data={pricerange}
            onValidateValue={atLeastOneSelected}
            // defaultPair={selectedCategory}
          />
        </View>
        <View style={styles.subtilte}>
          <Headline6>
            {localizedStrings.restaurant.clientFiltres.calification}
          </Headline6>
        </View>
        <View>
          <Dropdown
            placeholder={localizedStrings.restaurant.clientFiltres.starsnumber}
            // onValueChanged={handleValueChanged('category')}
            data={stars}
            onValidateValue={atLeastOneSelected}
            // defaultPair={selectedCategory}
          />
        </View>
        <View style={styles.applyFilter}>
          <ColorfulButton
            buttonContainerStyle={styles.newDishButton}
            title={localizedStrings.restaurant.clientFiltres.applyfilters}
            // onPress={}
          />
        </View>
      </ScrollPage>
    </View>
  );
}
