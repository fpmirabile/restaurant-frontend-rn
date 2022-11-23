import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
import { ItemsCategory } from '../../../../api/restaurant.api';
import { Body } from '../../morfando-text';
import { styles } from './styles';

interface PropTypes {
  itemsCategory: ItemsCategory;
}

export function AccordionItem({ itemsCategory }: PropTypes) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.imageContainer}>
          {itemsCategory.images.length === 0 ? (
            <Image
              source={require('../../../../assets/images/no-dish-photo.png')}
            />
          ) : (
            <Image source={{ uri: itemsCategory.images[0] }} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.detailContainer}>
        <View style={styles.titleContainer}>
          <Body darkPinkColor fontType={'bold'}>
            {itemsCategory.name}
          </Body>
        </View>
        <View>
          <Body style={styles.itemPrice}>{'$' + itemsCategory.price}</Body>
        </View>
      </View>
    </View>
  );
}
