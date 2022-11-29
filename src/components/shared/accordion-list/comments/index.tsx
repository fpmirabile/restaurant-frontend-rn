import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { ICONS } from '../../../../constants';
import { Comment } from '../../../../api/restaurant.api';
import { ImageButton } from '../../image-button';
import { Body, Headline6 } from '../../morfando-text';
import { UserComment } from '../../user-comment';
import { styles } from './styles';
import { CustomModal } from '../../custom-modal';

interface PropTypes {
  comments: Comment[];
  onSaveComment: (value: string, stars: number) => void;
}

export function CommentAccordionList({ comments, onSaveComment }: PropTypes) {
  const [showModal, setModalVisible] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);
  const handleShowContent = React.useCallback(() => {
    setShowContent(!showContent);
  }, [setShowContent, showContent]);

  const handleAddNewComment = React.useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible]);

  const handleCloseModal = React.useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <View style={styles.container}>
      <CustomModal
        modalTitle="Mi calificación"
        textPrimaryButton="Enviar calificación"
        textSecondaryButton="Cancelar"
        modalSubtitle="Cantidad de estrellas"
        isVisible={showModal}
        onClose={handleCloseModal}
        onAcceptModal={onSaveComment}
      />
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
      {showContent && (
        <>
          <View style={styles.addCommentContainer}>
            <ImageButton
              onPress={handleAddNewComment}
              imageSvg={ICONS.comment}
            />
          </View>
          {comments.length > 0 ? (
            comments.map(comment => {
              return (
                <View key={comment.date.toString()} style={styles.body}>
                  <UserComment comment={comment} />
                </View>
              );
            })
          ) : (
            <View style={styles.noCommentsContainer}>
              <Body center>
                Por el momento ningun usuario ha realizado comentarios sobre
                este restaurant
              </Body>
            </View>
          )}
        </>
      )}
    </View>
  );
}
