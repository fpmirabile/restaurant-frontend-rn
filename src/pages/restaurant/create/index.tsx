import * as React from 'react';
import { View } from 'react-native';
import { Caption, ScrollPage, Title } from '../../../components/shared';
import { localizedStrings } from '../../../localization/localized-strings';
import { MorfandoRouterParams } from '../../../navigation/navigation';
import { BottomBar } from './bottom-bar';
import { CreateRestaurantStepOne } from './step-1';
import { CreateRestaurantStepTwo } from './step-2';
import { styles } from './styles';

const steps = [CreateRestaurantStepOne, CreateRestaurantStepTwo];
interface PropTypes extends MorfandoRouterParams<'CreateRestaurant'> {}
export function CreateRestaurant({ navigation }: PropTypes) {
  const [step, setStep] = React.useState<number>(1);
  const handleGoBack = React.useCallback(() => {
    const previousStep = step - 1;
    if (previousStep <= 0) {
      return;
    }

    setStep(previousStep);
  }, [step]);

  const handleContinue = React.useCallback(() => {
    const nextStep = step + 1;
    if (nextStep > steps.length) {
      navigation.push('FinishedRestaurantCreation');
      return;
    }

    setStep(nextStep);
  }, [step, navigation]);

  const StepComponent = !!steps[step - 1] && steps[step - 1];
  return (
    <View style={styles.containerView}>
      <ScrollPage internalContainerStyles={styles.container}>
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
