import * as React from 'react';
import { View } from 'react-native';
import { Input, TouchableText, Checkbox, ColorfulButton, TransparentButton, ImageButton, CustomModal, Caption, ScrollPage, Headline5,ImagePicker } from '../../components/shared';
import {Headline6 } from '../../components/shared/morfando-text';
import SelectList from 'react-native-dropdown-select-list';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { styles } from './styles';
import { localizedStrings } from '../../localization/localized-strings';
import { ICONS } from '../../constants';

interface RouterProps extends MorfandoRouterParams<'NewDish'> {}

export function NewDish({ navigation }: RouterProps) {
  const backToRestaurant = React.useCallback(() => {navigation.navigate('CreateRestaurant')}, [navigation]);
  const backToHome = React.useCallback(() => {navigation.navigate('Home')}, [navigation]);

  // Hooks
  const [dishName] = React.useState<string>('');
  const [dishCategory] = React.useState<string>('');
  const [ingredient] = React.useState<string>('');
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

  // this will be attached with each input onChangeText
  const [textValue, setTextValue] = React.useState(''); 
// our number of inputs, we can add the length or decrease
  const [numInputs, setNumInputs] = React.useState(0);
// El texto que voy escribiendo en el text input
   const refInputs = React.useRef<string[]>([textValue]);


  // Array de elementos JSX que se va a usar para los inputs
  const inputs: JSX.Element[] = []
  // Esto lo tengo que cambiar por un render item. lo que tendria que hacer para agregar un
  //  elemento nuevo es mandarle un objeto con los atributos de cada renderitem
  for (let i = 0; i < numInputs; i++)
  {
    //Agrego un input
    inputs.push(
      <View key={i} style={styles.containerIngredient}>
        <View style={styles.containerInput}>
          <Input
          onChangeText={value => setInputValue(i, value)}
          value={refInputs.current[i]}
          placeholder={localizedStrings.restaurant.newDish.ingredient}
          borderBottom = {true}
          />
        </View>
        <View style={styles.containerIcon}>
          <ImageButton  onPress={()=>removeInput(i)} imageSvg={ICONS.removeIcon} />
        </View>
      </View>
    )
  }

  const setInputValue = (index: number, value: string) => {
    //primero estamos guardando el valor del input en refInput para traquearlo
    const inputs = refInputs.current;
    inputs[index] = value;
    setTextValue(value)
  }

  // SETEO DE HOOKS Y CAMPOS
  const addInput = ()=>{
    //Agrego un nuevo elemento en el array de refInputs
    refInputs.current.push('');
    //aumento el numero de input
    setNumInputs(value=> value + 1);
  }

  const removeInput = (i: number) =>{
    refInputs.current.splice(i,1)[0];
    setNumInputs(value=> value -1);
  }

  const showModal = ()=>{
    setModalVisible(true);
  }
  const handleCloseEditModal = React.useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

//Drop down
  const [selected, setSelected] = React.useState("");
  const data = [{key:'1',value:'Pastas'},{key:'2',value:'Postres'}];

  return (
    <View style={styles.containerView}>
    <ScrollPage internalContainerStyles={styles.container}>
      <View style={styles.title}>
        <Headline5 darkPinkColor>{localizedStrings.restaurant.newDish.title}</Headline5>
      </View>
      <View style={styles.subtilte}>
        <Headline6>{localizedStrings.restaurant.newDish.category}</Headline6>
      </View>
      <View style={styles.containerIngredient}>
        <View style={styles.containerInput}>
              <SelectList 
              placeholder={localizedStrings.restaurant.newDish.category}
              setSelected={setSelected} 
              data={data} 
              search={false}
              boxStyles={styles.dropDownBorder}
              dropdownStyles ={styles.dropdownStyles}/>
        </View>          
        <View style={styles.containerIcon}>
          {/* Me falta poner la accion en click */}
          <ImageButton  
          imageSvg={ICONS.addicon}
          onPress={showModal} 
          />

        <CustomModal 
          isVisible={isModalVisible}
          onClose={handleCloseEditModal}
          modalTitle={'¿Desea eliminar su cuenta?'}
          modalSubtitle={'Cantidad de estrellas'}
          //bodyText={'Si elimina su cuenta automáticamente se eliminaran todos sus restaurantes.'}
          textPrimaryButton={localizedStrings.restaurant.newDish.create}
          textSecondaryButton={localizedStrings.restaurant.newDish.cancel}
          input={false}
          />
        </View>
      </View>
      <View style={styles.subtilte}>
        <Headline6>{localizedStrings.restaurant.newDish.dishInformation}</Headline6>
      </View>
      <View>
        <Input
              containerStyles={styles.input}
              value={dishName}
              placeholder={localizedStrings.restaurant.newDish.dishName}
            />
        <Input
              containerStyles={styles.input}
              value={dishCategory}
              placeholder={localizedStrings.restaurant.newDish.sellPrice}
            />
        <View style={styles.checkbox}>
          <Checkbox placeholder='Apto celiacos'/>
          <Checkbox placeholder='Vegano'/>
        </View>    
      </View>
      <View style={styles.subtilte}>
        <Headline6>{localizedStrings.restaurant.newDish.dishImages}</Headline6>
      </View>
        <ImagePicker maxAmountOfImages={5}/>
        <Caption>{localizedStrings.restaurant.create.picturesCaption(0, 5)}</Caption>
      <View style={styles.subtilte}>
        <Headline6>{localizedStrings.restaurant.newDish.dishIngredients}</Headline6>
      </View>
        <View>
          {inputs}
        </View>
        <View style={styles.addIngredient}>
          <TouchableText
            message={localizedStrings.restaurant.newDish.addIngredient}
            type= 'bodyDarkPink'
            onPress={addInput}
          />
        </View>
        <View style={styles.createNewDishContainer}>
        <ColorfulButton
          buttonContainerStyle={styles.newDishButton}
          title={localizedStrings.restaurant.newDish.finish}
          onPress={backToHome}
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