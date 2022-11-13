import * as React from 'react';
import { View } from 'react-native';
import { Caption, ScrollPage, Title } from '../../../components/shared';
import { localizedStrings } from '../../../localization/localized-strings';
import { MorfandoRouterParams } from '../../../navigation/navigation';
import { actions } from '../../../redux';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { BottomBar } from './bottom-bar';
import { CreateRestaurantStepOne } from './step-1';
import { CreateRestaurantStepTwo } from './step-2';
import { styles } from './styles';

const steps = [CreateRestaurantStepOne, CreateRestaurantStepTwo];
interface PropTypes extends MorfandoRouterParams<'CreateRestaurant'> {}
export function CreateRestaurant({ navigation }: PropTypes) {
  const dispatch = useAppDispatch();
  const { stepOne, stepTwo } = useAppSelector(state => state.restaurant.create);
  const [step, setStep] = React.useState<number>(1);
  const handleGoBack = React.useCallback(() => {
    const previousStep = step - 1;
    if (previousStep <= 0) {
      navigation.goBack();
      dispatch(actions.restaurants.onCancelRestaurantCreate());
      return;
    }

    setStep(previousStep);
  }, [step, navigation, dispatch]);

  const handleContinue = React.useCallback(() => {
    const nextStep = step + 1;
    if (nextStep > steps.length) {
      if (Object.values(stepTwo).some(value => !value)) {
        return;
      }

      dispatch(actions.restaurants.createRestaurant());
      navigation.push('FinishedRestaurantCreation');
      return;
    }

    console.log(Object.values(stepOne));
    if (Object.values(stepOne).some(value => !value)) {
      console.log(Object.values(stepOne));
      return;
    }
    setStep(nextStep);
  }, [step, navigation, dispatch, stepOne, stepTwo]);

  const StepComponent = !!steps[step - 1] && steps[step - 1];
  return (
    <View style={styles.containerView}>
      <ScrollPage
        nestedScrollEnabled
        internalContainerStyles={styles.container}>
        <View>
          <Title darkPinkColor>{localizedStrings.restaurant.title}</Title>
          <Caption darkPinkColor>
            {localizedStrings.restaurant.subtitle(step, steps.length)}
          </Caption>
        </View>
        <View style={styles.formContainer}>
          <StepComponent />
        </View>
      </ScrollPage>
      <BottomBar
        shouldShowBack={step > 1}
        onBack={handleGoBack}
        onContinue={handleContinue}
      />
    </View>
  );
}
