import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Input, TouchableText, Checkbox, PressableView, ColorfulButton, TransparentButton } from '../../components/shared';
import { Caption, ScrollPage, Title, Headline5 } from '../../components/shared';
import { Body, Headline6 } from '../../components/shared/morfando-text';

import { MorfandoRouterParams } from '../../navigation/navigation';
import { styles } from './styles';
import { localizedStrings } from '../../localization/localized-strings';
import { ICONS } from '../../constants';
import { Value } from 'sass';
import { style } from '../../components/shared/image-button/style';

type InputType = 'email' | 'nya' | 'password';
// interface RouterProps extends MorfandoRouterParams<'Registration'> {}

// export function NewDish({ navigation }: RouterProps) {
export function NewDish() {

  // Hooks
  const [categories] = React.useState<string>('');
  const [dishName] = React.useState<string>('');
  const [dishCategory] = React.useState<string>('');
  const [ingredient] = React.useState<string>('');

  // this will be attached with each input onChangeText
  const [textValue, setTextValue] = React.useState(''); 
// our number of inputs, we can add the length or decrease
  const [numInputs, setNumInputs] = React.useState(0);
// El texto que voy escribiendo en el text input
   const refInputs = React.useRef<string[]>([textValue]);

  // const goToMain = () => {
  //   navigation.goBack();
  // };
  const AddImageIcon = ICONS.addImage;
  const AddIcon = ICONS.add;
  const RemoveIcon = ICONS.remove;
  const [step, setStep] = React.useState<number>(1);
  const steps = [];




  // Array de elementos JSX que se va a usar para los inputs
  const inputs: JSX.Element[] = []
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
          <Pressable onPress={()=>removeInput(i)}>
              {<RemoveIcon/>}
          </Pressable>
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
  const handleInputOnChange = (input: InputType) => (text: string) => {
    // if (input === 'email') {
    //   setUserEmail(text);
    //   return;
    // } else {
    //   if ((input = 'nya')) {
    //     setNameAndSurname(text);
    //   }
    // }
    // setPassword(text);
  };

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
          <Input
                containerStyles={styles.input}
                value={categories}
                placeholder={localizedStrings.restaurant.newDish.categories}
              />
        </View>
        <View style={styles.containerIcon}>
          <Pressable>
                {<AddIcon/>}
          </Pressable>
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
      <PressableView containerStyles={styles.addPictureContainer}>
        <AddImageIcon />
        <Body style={styles.addPictureBody}>
          {localizedStrings.restaurant.create.addPictures}
        </Body>
      </PressableView>
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
        />
        <TransparentButton
          buttonContainerStyle={styles.newDishButton}
          title={localizedStrings.restaurant.newDish.cancel}
        />
      </View>
    </ScrollPage>
  </View>
);
}
