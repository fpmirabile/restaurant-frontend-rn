import * as React from 'react';
import { View } from 'react-native';
import { Body } from '../morfando-text';
import { styles } from './styles';
import { Image } from 'react-native';

interface PropTypes {
  dishName: string,
  price:number,
  dishPhoto?:string,
}

export function MenuItem({
dishName,
price,
dishPhoto,
}: PropTypes) {
  return (
    <View style={styles.commentStyle}>
      <View style={styles.dishPhoto}>
        {
          dishPhoto==undefined ? (
            <Image
            source={require('../../../assets/images/no-dish-photo.png')}
            style={styles.imageStyle}
            />
          ) : (
            <Image
            source={{uri:dishPhoto}}
            style={styles.imageStyle}
            />
          )
        }
      </View>
      <View style={styles.textStyle}>
        <Body darkPinkColor fontType='bold'>{dishName}</Body>
        <Body>{price}</Body>
      </View>
     
    </View>
  );
}