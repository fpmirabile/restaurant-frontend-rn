import * as React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { Rating } from 'react-native-ratings';
import { ColorfulButton, TransparentButton } from '../button';
import { Headline5, Headline6, Body } from '../morfando-text';
import { Input } from '../text-input';
import { ICONS } from '../../../constants';
import { ImageButton } from '../image-button';
import { styles } from './styles';

interface PropTypes {
  isVisible: boolean;
  onClose?: () => void;
  modalTitle: string;
  modalSubtitle?: string;
  bodyText?: string;
  textPrimaryButton: string;
  textSecondaryButton: string;
  input?: Boolean;
  inputPlaceholder?: string;
}

export function CustomModal({
  isVisible,
  onClose,
  modalTitle,
  modalSubtitle,
  bodyText,
  input,
  textPrimaryButton,
  textSecondaryButton,
  inputPlaceholder,
}: PropTypes) {
  const [dishCategory] = React.useState<string>('');
  const [restaurantReview] = React.useState<string>('');
  const [rating, updateRating] = React.useState<number>(0);

  const actualizarEstrellas = React.useCallback(
    (estrellas: number) => {
      updateRating(estrellas);
      console.log(estrellas);
    },
    [updateRating],
  );

  return (
    <Modal isVisible={isVisible} style={styles.modalStyles}>
      <View style={styles.containerView}>
        <View style={[styles.parentView, styles.modalTitleContainer]}>
          <Headline5>{modalTitle}</Headline5>
          <ImageButton
            imageStyle={styles.closeIcon}
            onPress={onClose}
            imageSvg={ICONS.closeIcon}
          />
        </View>
        <View>
          {!!modalSubtitle && (
            <View>
              <View style={styles.subTitle}>
                <Headline6>{modalSubtitle}</Headline6>
              </View>
              <View style={styles.spaceForStars}>
                <Rating
                  imageSize={24}
                  startingValue={rating}
                  fractions={0}
                  ratingColor="#FFDF6B"
                  onFinishRating={actualizarEstrellas}
                />
              </View>
              <View style={styles.spaceForText}>
                <Input
                  value={restaurantReview}
                  placeholder={'Ingrese su comentario sobre el resaturante'}
                />
              </View>
            </View>
          )}

          {input && (
            <View style={styles.spaceForText}>
              <Input value={dishCategory} placeholder={inputPlaceholder} />
            </View>
          )}

          {!!bodyText && (
            <View style={styles.spaceForText}>
              <Body>{bodyText}</Body>
            </View>
          )}
        </View>

        <View
          style={[
            styles.parentView,
            styles.buttonsContainer,
            styles.spaceFromError,
          ]}>
          <TransparentButton
            buttonContainerStyle={[styles.button]}
            title={textSecondaryButton}
            onPress={onClose}
          />
          <ColorfulButton
            buttonContainerStyle={[styles.button, styles.cancelButton]}
            title={textPrimaryButton}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}
