import * as React from 'react';
import { View } from 'react-native';
import { Input, TouchableText, Checkbox, PressableView } from '../../components/shared';
import { Caption, ScrollPage, Title, Headline5 } from '../../components/shared';
import { Body, Headline6 } from '../../components/shared/morfando-text';

import { MorfandoRouterParams } from '../../navigation/navigation';
import { styles } from './styles';
import { localizedStrings } from '../../localization/localized-strings';
import { ICONS } from '../../constants';

type InputType = 'email' | 'nya' | 'password';
// interface RouterProps extends MorfandoRouterParams<'Registration'> {}

// export function NewDish({ navigation }: RouterProps) {
export function NewDish() {

  // Hooks
  const [categories] = React.useState<string>('');
  const [dishName] = React.useState<string>('');
  const [dishCategory] = React.useState<string>('');


  // const goToMain = () => {
  //   navigation.goBack();
  // };
  const AddImageIcon = ICONS.addImage;
  const [step, setStep] = React.useState<number>(1);
  const steps = [];


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
      <View>
        <Input
              containerStyles={styles.input}
              value={categories}
              placeholder={localizedStrings.restaurant.newDish.categories}
            />
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
      <View style={styles.formContainer}>
        {/* <StepComponent /> */}
      </View>
    </ScrollPage>
    {/* <BottomBar
        shouldShowBack={step > 1}
        onBack={}
        onContinue={}
      /> */}
  </View>
);
}
