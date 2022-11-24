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
import { notEmpty } from '../../../util/validation';

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
  onAcceptModal?: (value: string) => void;
  onCancelModal?: () => void;
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
  onAcceptModal,
}: PropTypes) {
  const [inputText, setInputText] = React.useState<string>('');
  const [restaurantReview] = React.useState<string>('');
  const [rating, updateRating] = React.useState<number>(0);

  const actualizarEstrellas = React.useCallback(
    (estrellas: number) => {
      updateRating(estrellas);
      console.log(estrellas);
    },
    [updateRating],
  );

  const handleInputChange = React.useCallback(
    (text: string) => {
      setInputText(text);
    },
    [setInputText],
  );

  const handleOnAccept = React.useCallback(() => {
    if (onAcceptModal) {
      onAcceptModal(inputText);
      return;
    }

    onClose && onClose();
  }, [onAcceptModal, inputText, onClose]);

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
              <Input
                onValidateText={notEmpty}
                onChangeText={handleInputChange}
                errorMessage="Este campo no puede ser vacio."
                value={inputText}
                placeholder={inputPlaceholder}
              />
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
            onPress={handleOnAccept}
          />
        </View>
      </View>
    </Modal>
  );
}
