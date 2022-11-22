import * as React from 'react';
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  View,
} from 'react-native';
import {
  Input,
  TouchableText,
  Checkbox,
  ColorfulButton,
  TransparentButton,
  ImageButton,
  CustomModal,
  Caption,
  ScrollPage,
  Headline5,
  ImagePicker,
  Headline6,
  Dropdown,
} from '../../components/shared';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { localizedStrings } from '../../localization/localized-strings';
import { ICONS } from '../../constants';
import { atLeastOneSelected, notEmpty } from '../../util/validation';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CreateMenu } from '../../redux/reducers/restaurant/slice';
import { actions } from '../../redux';

interface RouterProps extends MorfandoRouterParams<'NewDish'> {}

export function NewDish({ navigation }: RouterProps) {
  const createMenu = useAppSelector(state => state.restaurant.menu);
  //Consumo las categorias del estado general de la app
  const categoriesList = useAppSelector(state => state.restaurant.categories)
  console.log(categoriesList)
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [currentIngredient, setCurrentIngredient] = React.useState<{
    value: string;
    index: number;
  }>({ value: '', index: -1 });


  const categories = [
    { key: '1', value: 'Postres' },
    { key: '2', value: 'Carnes' },
    { key: '3', value: 'Pizza' },
    { key: '4', value: 'Ensaladas' },
  ];

  const selectedCategory = categories.find(
    locality => locality.value === createMenu.category,
  );

  const backToRestaurant = React.useCallback(() => {
    navigation.navigate('CreateRestaurant');
  }, [navigation]);

  const saveMenu = React.useCallback(() => {
    if (Object.values(createMenu).some(i => i === '')) {
      return;
    }

    dispatch(actions.restaurants.saveMenu());
    navigation.navigate('Home');
  }, [navigation, createMenu, dispatch]);

  const handleValueChanged = (field: keyof CreateMenu) => (value: any) => {
    const catId =
      field === 'category'
        ? categories.find(cat => cat.value === value)?.key || ''
        : createMenu.categoryId;

    dispatch(
      actions.restaurants.updateMenu({
        ...createMenu,
        categoryId: catId,
        [field]: value,
      }),
    );
  };

  const handleIngredientChange =
    (index: number) =>
    (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
      const ingredients = [...createMenu.ingredients];
      ingredients[index] = e.nativeEvent.text;
      handleValueChanged('ingredients')(ingredients);
      setCurrentIngredient({
        index: -1,
        value: '',
      });
    };

  const handleCurrentIngredientChange = (index: number) => (value: string) => {
    setCurrentIngredient({
      index,
      value,
    });
  };

  const handleRemoveIngredient = (index: number) => () => {
    const ingredients = createMenu.ingredients;
    const newArray = ingredients.filter(
      ingredient => ingredients[index] !== ingredient,
    );

    handleValueChanged('ingredients')(newArray);
  };

  const handleAddInput = () => {
    const ingredients = [...createMenu.ingredients];
    ingredients.push('');
    handleValueChanged('ingredients')(ingredients);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCloseEditModal = React.useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <View style={styles.containerView}>
      <ScrollPage internalContainerStyles={styles.container}>
        <View style={styles.title}>
          <Headline5 darkPinkColor>
            {localizedStrings.restaurant.newDish.title}
          </Headline5>
        </View>
        <View style={styles.subtilte}>
          <Headline6>{localizedStrings.restaurant.newDish.category}</Headline6>
        </View>
        <View style={styles.containerIngredient}>
          <View style={styles.containerInput}>
            <Dropdown
              placeholder={localizedStrings.restaurant.newDish.category}
              onValueChanged={handleValueChanged('category')}
              data={categories}
              onValidateValue={atLeastOneSelected}
              defaultPair={selectedCategory}
              errorMessage="Debe ingresar una categoria valida."
            />
          </View>
          <View style={styles.containerIcon}>
            <ImageButton imageSvg={ICONS.addIcon} onPress={showModal} />
            <CustomModal
              isVisible={isModalVisible}
              onClose={handleCloseEditModal}
              modalTitle={localizedStrings.restaurant.newDish.modalTitle}
              input={true}
              inputPlaceholder={localizedStrings.restaurant.newDish.modalInputPlaceholder}
              textPrimaryButton={localizedStrings.restaurant.newDish.create}
              textSecondaryButton={localizedStrings.restaurant.newDish.cancel}
            />
          </View>
        </View>
        <View style={styles.subtilte}>
          <Headline6>
            {localizedStrings.restaurant.newDish.dishInformation}
          </Headline6>
        </View>
        <View>
          <Input
            containerStyles={styles.input}
            value={createMenu.name}
            onChangeText={handleValueChanged('name')}
            errorMessage="Debe ingresar un nombre."
            onValidateText={notEmpty}
            placeholder={localizedStrings.restaurant.newDish.dishName}
          />
          <Input
            containerStyles={styles.input}
            value={createMenu.price}
            onChangeText={handleValueChanged('price')}
            errorMessage="Debe ingresar un precio."
            onValidateText={notEmpty}
            placeholder={localizedStrings.restaurant.newDish.sellPrice}
            keyboardType="numeric"
          />
          <View style={styles.checkbox}>
            <Checkbox
              previousValue={createMenu.celiac}
              onValueChanged={handleValueChanged('celiac')}
              placeholder="Apto celiacos"
            />
            <Checkbox
              previousValue={createMenu.vegan}
              onValueChanged={handleValueChanged('vegan')}
              placeholder="Vegano"
            />
          </View>
        </View>
        <View style={styles.subtilte}>
          <Headline6>
            {localizedStrings.restaurant.newDish.dishImages}
          </Headline6>
        </View>
        <ImagePicker
          onImageAdded={handleValueChanged('images')}
          previousImages={createMenu.images}
          maxAmountOfImages={5}
        />
        <Caption>
          {localizedStrings.restaurant.create.picturesCaption(
            createMenu.images.length,
            5,
          )}
        </Caption>
        <View style={styles.subtilte}>
          <Headline6>
            {localizedStrings.restaurant.newDish.dishIngredients}
          </Headline6>
        </View>
        <View>
          {createMenu.ingredients.map((ingredient, index) => {
            return (
              <View key={ingredient + index} style={styles.containerIngredient}>
                <View style={styles.containerInput}>
                  <Input
                    onEndEditing={handleIngredientChange(index)}
                    onChangeText={handleCurrentIngredientChange(index)}
                    value={
                      currentIngredient.index === index
                        ? currentIngredient.value
                        : ingredient
                    }
                    placeholder={localizedStrings.restaurant.newDish.ingredient}
                    borderBottom
                  />
                </View>
                <View style={styles.containerIcon}>
                  <ImageButton
                    onPress={handleRemoveIngredient(index)}
                    imageSvg={ICONS.removeIcon}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.addIngredient}>
          <TouchableText
            message={localizedStrings.restaurant.newDish.addIngredient}
            type="bodyDarkPink"
            onPress={handleAddInput}
          />
        </View>
        <View style={styles.createNewDishContainer}>
          <ColorfulButton
            buttonContainerStyle={styles.newDishButton}
            title={localizedStrings.restaurant.newDish.finish}
            onPress={saveMenu}
          />
          <TransparentButton
            buttonContainerStyle={styles.newDishButton}
            title={localizedStrings.restaurant.newDish.cancel}
            onPress={backToRestaurant}
          />
        </View>
      </ScrollPage>
    </View>
  );
}
