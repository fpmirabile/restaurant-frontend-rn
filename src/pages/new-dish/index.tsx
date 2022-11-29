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
  Body,
} from '../../components/shared';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { localizedStrings } from '../../localization/localized-strings';
import { ICONS } from '../../constants';
import { atLeastOneSelected, notEmpty } from '../../util/validation';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CreateMenu } from '../../redux/reducers/restaurant/slice';
import { actions } from '../../redux';
import { showPersonalizedToast } from '../../util/toast';

interface RouterProps extends MorfandoRouterParams<'NewDish'> {}

export function NewDish({ navigation }: RouterProps) {
  const {
    menu: createMenu,
    categories: categoriesList,
    view: { selectedRestaurant },
    created: { id: createdRestaurantId },
  } = useAppSelector(state => state.restaurant);
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [currentIngredient, setCurrentIngredient] = React.useState<{
    value: string;
    index: number;
  }>({ value: '', index: -1 });

  const lookSelectedCategory = categoriesList.find(
    category =>
      category.name.toLowerCase() === createMenu.category.toLowerCase(),
  );

  const selectedCategory = lookSelectedCategory
    ? {
        key: lookSelectedCategory.id.toString(),
        value: lookSelectedCategory.name,
      }
    : undefined;

  console.log('selected category', selectedCategory);

  const handleCancelPressed = React.useCallback(() => {
    dispatch(actions.restaurants.cleanMenuCreation());
    navigation.navigate(selectedRestaurant?.id ? 'ViewRestaurant' : 'Home');
  }, [navigation, selectedRestaurant, dispatch]);

  const saveMenu = React.useCallback(() => {
    if (Object.values(createMenu).some(i => i === '')) {
      return;
    }

    dispatch(
      actions.restaurants.saveMenu(
        selectedRestaurant?.id || createdRestaurantId,
      ),
    );
    navigation.reset({
      index: 1,
      routes: [{ name: 'Home' }, { name: 'ViewRestaurant' }],
    });
  }, [
    navigation,
    createMenu,
    dispatch,
    selectedRestaurant,
    createdRestaurantId,
  ]);

  const handleValueChanged = (field: keyof CreateMenu) => (value: any) => {
    const catId =
      field === 'category'
        ? categoriesList
            .find(cat => cat.name.toLowerCase().includes(value.toLowerCase()))
            ?.id.toString() || ''
        : createMenu.categoryId;

    console.log(categoriesList);
    console.log('catId', catId);
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

  const handleCloseCategoryModal = React.useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  const handleOnAcceptModal = React.useCallback(
    (categoryName: string) => {
      // console.log(categoryName, selectedRestaurant?.id);
      //Validacion para no crear categorias
      if (
        categoriesList.find(cat =>
          cat.name
            .toLocaleLowerCase()
            .includes(categoryName.toLocaleLowerCase()),
        )
      ) {
        console.log('Ya esta la categoria');
        showPersonalizedToast({
          type: 'error',
          text1: 'Categoria existente',
          text2: 'La categoria que intenta crear ya existe',
          autoHide: true,
        });
      } else {
        console.log('No esta la categoria');
        dispatch(
          actions.restaurants.createCategory({
            categoryName,
            restaurantId: selectedRestaurant?.id || createdRestaurantId || 0,
          }),
        );
        showPersonalizedToast({
          type: 'success',
          text1: 'Categoria creada',
          text2: 'Categoria creada satisfactoriamente 🎉',
          autoHide: true,
        });
      }

      handleCloseCategoryModal();
    },
    [
      dispatch,
      selectedRestaurant,
      handleCloseCategoryModal,
      createdRestaurantId,
      categoriesList,
    ],
  );

  React.useEffect(() => {
    return () => {
      dispatch(actions.restaurants.cleanCreated());
    };
  }, [dispatch]);

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
              data={categoriesList.map(cat => {
                return { key: cat.id.toString(), value: cat.name };
              })}
              onValidateValue={atLeastOneSelected}
              defaultPair={selectedCategory}
              errorMessage="Debe ingresar una categoria valida."
            />
          </View>
          <View style={styles.containerIcon}>
            <ImageButton imageSvg={ICONS.addIcon} onPress={showModal} />
            <CustomModal
              isVisible={isModalVisible}
              onClose={handleCloseCategoryModal}
              modalTitle={localizedStrings.restaurant.newDish.modalTitle}
              input={true}
              inputPlaceholder={
                localizedStrings.restaurant.newDish.modalInputPlaceholder
              }
              textPrimaryButton={localizedStrings.restaurant.newDish.create}
              textSecondaryButton={localizedStrings.restaurant.newDish.cancel}
              onAcceptModal={handleOnAcceptModal}
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
        {createMenu.error && <Body>{createMenu.error}</Body>}
        <View style={styles.createNewDishContainer}>
          <TransparentButton
            buttonContainerStyle={styles.newDishButton}
            title={localizedStrings.restaurant.newDish.cancel}
            onPress={handleCancelPressed}
          />
          <ColorfulButton
            buttonContainerStyle={styles.newDishButton}
            title={localizedStrings.restaurant.newDish.finish}
            onPress={saveMenu}
          />
        </View>
      </ScrollPage>
    </View>
  );
}
