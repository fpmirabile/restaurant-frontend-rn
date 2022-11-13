import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
import { Body } from '../../../components/shared';
import { ItemCategory } from '../accordion-list';
//import { ICONS } from '../../../constants';
import { styles } from './styles';

interface PropTypes {
  itemCategory: ItemCategory;
}

export function AccordionItem({ itemCategory }: PropTypes) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/temporal/flan-casero.png')}
            //source={require(itemCategory.imageSource)}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.detailContainer}>
        <View style={styles.titleContainer}>
          <Body darkPinkColor fontType={'bold'}>
            {itemCategory.title}
          </Body>
        </View>
        <View>
          <Body style={styles.itemPrice}>{itemCategory.price}</Body>
        </View>
      </View>
    </View>
  );
}
