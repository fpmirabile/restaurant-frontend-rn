import * as React from 'react';
import { Share, View } from 'react-native';
import { TouchableText, ImageButton } from '../../components/shared';
import { ICONS } from '../../constants';
import { styles } from './styles';
import { useAppSelector } from '../../redux/store';

interface PropTypes {
  onPressBack: () => void;
  shareIcon?: boolean;
  onShareClick?: () => void;
}

export function ProfileNavHeader({
  onPressBack,
  shareIcon,
}: PropTypes) {
  const { leftChevron: LeftChevron } = ICONS;
  const {
    view: { selectedRestaurant },
  } = useAppSelector(state => state.restaurant);

  const name = selectedRestaurant?.name
  const addres = selectedRestaurant?.address
  const style = selectedRestaurant?.categories
  const priceRange = selectedRestaurant?.priceRange
  const stars = selectedRestaurant?.stars

  const onShare = async () => {
      if(selectedRestaurant!= undefined)
      {
        let text = selectedRestaurant?.toString()
        
          try {
            const result = await Share.share({
              message:'Te recomiendo este restaurante. Se llama: ' +name+ ' su direccion es: '+addres +' su estilo de comida: '+style+ 'su rango de precio es: '+priceRange +' y su calificación es de: '+ stars +' estrellas',
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {

          }

      
  }}

  return (
    <View style={styles.headerContainer}>
      <View style={styles.goBackContainer}>
        <LeftChevron />
        <TouchableText message="Volver" onPress={onPressBack} type="ctaText" />
      </View>
      <View style={styles.socialShareContainer}>
        {shareIcon == true ? (
          <ImageButton imageSvg={ICONS.socialShare} onPress={onShare} />
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}
