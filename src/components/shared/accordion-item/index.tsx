import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
import { Body } from '../../../components/shared';
//import { ICONS } from '../../../constants';
import { styles } from './styles';

interface PropTypes {
  imageSource?: string;
  title: string;
  price: string;
}

export function AccordionItem({ title, price }: PropTypes) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/temporal/flan-casero.png')}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.detailContainer}>
        <View style={styles.titleContainer}>
          <Body darkPinkColor fontType={'bold'}>
            {title}
          </Body>
        </View>
        <View style={styles.priceContainer}>
          <Body>{price}</Body>
        </View>
      </View>
      {/* {showContent && (
        <View style={styles.body}>
          <Text> {bodyText} </Text>
        </View>
      )} */}
    </View>
  );
}
