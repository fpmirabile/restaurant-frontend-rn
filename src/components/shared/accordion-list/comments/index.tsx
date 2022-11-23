import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { ICONS } from '../../../../constants';
import { Comment } from '../../../../api/restaurant.api';
import { ImageButton } from '../../image-button';
import { Headline6 } from '../../morfando-text';
import { UserComment } from '../../user-comment';
import { styles } from './styles';

interface PropTypes {
  comments: Comment[];
}

export function CommentAccordionList({ comments }: PropTypes) {
  const [showContent, setShowContent] = React.useState(false);
  const handleShowContent = React.useCallback(() => {
    setShowContent(!showContent);
  }, [setShowContent, showContent]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShowContent}>
        <View style={styles.titleContainer}>
          <View style={{ flexDirection: 'row' }}>
            <ImageButton
              imageStyle={{ marginRight: 10, marginLeft: 16 }}
              imageSvg={ICONS.comment}
            />
            <Headline6>Comentarios</Headline6>
          </View>
          {showContent ? (
            <ImageButton imageSvg={ICONS.upChevron} />
          ) : (
            <ImageButton imageSvg={ICONS.downChevron} />
          )}
        </View>
      </TouchableOpacity>
      {showContent && comments.length > 0 && (
        <>
          {comments.map(comment => {
            return (
              <View key={comment.date.toString()} style={styles.body}>
                <UserComment comment={comment} />
              </View>
            );
          })}
        </>
      )}
    </View>
  );
}
