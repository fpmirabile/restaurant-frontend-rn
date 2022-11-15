import * as React from 'react';
import { View } from 'react-native';
import { Rating as LibRating } from 'react-native-ratings';
import { styles } from './styles';

interface PropTypes {
  disabled?: boolean;
  currentValue?: number;
  onStarChanged?: () => void;
  starSize?: number;
  starColor?: string;
}

export function Rating({
  currentValue,
  disabled,
  onStarChanged,
  starSize,
  starColor,
}: PropTypes) {
  const [rating, updateRating] = React.useState<number>(currentValue || 0);

  const updateStars = React.useCallback(
    (stars: number) => {
      if (!disabled) {
        updateRating(stars);

        if (onStarChanged) {
          onStarChanged();
        }
      }
    },
    [updateRating, onStarChanged, disabled],
  );

  return (
    <View style={styles.ratingContainer}>
      <View style={styles.spaceForStars}>
        <LibRating
          imageSize={starSize || 24}
          startingValue={rating}
          fractions={0}
          ratingColor={starColor || '#FFDF6B'}
          onFinishRating={updateStars}
        />
      </View>
    </View>
  );
}
