import * as React from 'react';
import { Image, View } from 'react-native';
import { Body } from '../morfando-text';
import { Comment } from '../../../api/restaurant.api';
import { Rating } from '../rating';
import { styles } from './styles';

interface PropTypes {
  comment: Comment;
}

export function UserComment({ comment }: PropTypes) {
  return (
    <View style={styles.commentStyle}>
      <View style={styles.profilePhoto}>
        {!comment.photo ? (
          <Image
            source={require('../../../assets/images/non-profile-img.png')}
            style={styles.imageStyle}
          />
        ) : (
          <Image source={{ uri: comment.photo }} style={styles.imageStyle} />
        )}
      </View>
      <View style={styles.textStyle}>
        <Body darkPinkColor fontType="bold">
          {comment.name}
        </Body>
        <Body>{comment.comment}</Body>
        <View style={styles.starsSpace}>
          <Rating
            starSize={16}
            currentValue={comment.stars}
            starColor="#FFDF6B"
            disabled
          />
        </View>
      </View>
    </View>
  );
}
