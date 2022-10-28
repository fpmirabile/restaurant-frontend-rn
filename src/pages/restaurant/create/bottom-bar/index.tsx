import * as React from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../../../components/shared';
import { ICONS } from '../../../../constants';
import { localizedStrings } from '../../../../localization/localized-strings';
import { styles } from './styles';

interface PropTypes {
  shouldShowBack: boolean;
  onContinue: () => void;
  onBack: () => void;
}

export function BottomBar({ shouldShowBack, onBack, onContinue }: PropTypes) {
  const { leftChevron: LeftChevron, rightChevron: RightChevron } = ICONS;
  return (
    <View style={styles.bottomButtonsContainer}>
      <View style={styles.ctaContainer}>
        {shouldShowBack && (
          <>
            <LeftChevron />
            <TouchableText
              onPress={onBack}
              type="ctaText"
              message={localizedStrings.restaurant.bottomBar.previous}
            />
          </>
        )}
      </View>
      <View style={styles.ctaContainer}>
        <TouchableText
          onPress={onContinue}
          type="ctaText"
          message={localizedStrings.restaurant.bottomBar.next}
        />
        <RightChevron />
      </View>
    </View>
  );
}
