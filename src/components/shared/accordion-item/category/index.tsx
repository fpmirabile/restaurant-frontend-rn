import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
import { ItemsCategory } from '../../../../api/restaurant.api';
import { ICONS } from '../../../../constants';
import { Body2, Body3 } from '../../morfando-text';
import { styles } from './styles';
import { ImageButton } from '../../image-button';
import { useAppDispatch } from '../../../../redux/store';
import { actions } from '../../../../redux';

interface PropTypes {
  itemsCategory: ItemsCategory;
}

export function AccordionItem({ itemsCategory }: PropTypes) {
  const dispatch = useAppDispatch();
  const deleteDish = React.useCallback(() => {
    dispatch(actions.restaurants.deleteDish(itemsCategory.id));
  }, [itemsCategory, dispatch]);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.imageContainer}>
          {itemsCategory.images.length === 0 || !itemsCategory.images ? (
            <Image
              source={require('../../../../assets/images/no-dish-photo.png')}
            />
          ) : (
            <Image
              style={styles.images}
              source={{ uri: itemsCategory.images[0] }}
            />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.detailContainer}>
        <View style={styles.titleContainer}>
          <Body3 darkPinkColor>{itemsCategory.name}</Body3>
        </View>
        <View>
          <Body2 style={styles.itemPrice}>{'$' + itemsCategory.price}</Body2>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <ImageButton imageSvg={ICONS.trash} onPress={deleteDish} />
      </View>
    </View>
  );
}
