import * as React from 'react';
import { View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Body } from '../morfando-text';
import { styles } from './styles';
import { Image } from 'react-native';

interface PropTypes {
  user: string;
  comment: string;
  stars: number;
  profilePhoto?: string;
}

export function UserComment({ user, comment, stars, profilePhoto }: PropTypes) {
  return (
    <View style={styles.commentStyle}>
      <View style={styles.profilePhoto}>
        {!profilePhoto ? (
          <Image
            source={require('../../../assets/images/non-profile-img.png')}
            style={styles.imageStyle}
          />
        ) : (
          <Image source={{ uri: profilePhoto }} style={styles.imageStyle} />
        )}
      </View>
      <View style={styles.textStyle}>
        <Body darkPinkColor fontType="bold">
          {user}
        </Body>
        <Body>{comment}</Body>
        <View style={styles.starsSpace}>
          <Rating
            imageSize={16}
            startingValue={stars}
            fractions={0}
            ratingColor="#FFDF6B"
            readonly={true}
          />
        </View>
      </View>
    </View>
  );
}
