import * as React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ColorfulButton, TransparentButton } from '../button';
import { Headline5,Headline6, Body } from '../morfando-text';
import { Input } from '../text-input';
// import { PressableInput } from '../text-input';
// import { TouchableText } from '../touchable-text';
import { ICONS } from '../../../constants';
import { ImageButton } from '../image-button';
import { styles } from './styles';
import { Value } from 'sass';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

interface PropTypes {
  isVisible: boolean;
  onClose?: () => void;
  modalTitle: string,
  modalSubtitle?:string,
  bodyText?:string,
  textPrimaryButton: string,
  textSecondaryButton: string,
  input?:Boolean,
  inputPlaceholder?:string,
//   // onSavePressed: (isClosed: boolean, formData: TimeInput[]) => void;
//   // formData?: TimeInput[];
//   isOpened?: boolean;
}


// // type TimeFields = keyof TimeInput;
export function CustomModal({
//   // formData,
  isVisible,
  onClose,
  modalTitle,
  modalSubtitle,
  bodyText,
  input,
  textPrimaryButton,
  textSecondaryButton,
  inputPlaceholder,
//   // onSavePressed,
//   // isOpened,
}: PropTypes) {

  //HOOKS
  const [dishCategory] = React.useState<string>('');
  const [restaurantReview] = React.useState<string>('');
  const [rating,updateRating] = React.useState<number>(0);

  

const actualizarEstrellas = React.useCallback(
  (estrellas : number) => {
    updateRating(estrellas)
    console.log(estrellas);
  },[updateRating],
);

  return (
    <Modal 
    isVisible={isVisible} 
    style={styles.modalStyles}>             
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
          {
            modalSubtitle!=undefined &&(
              <View>
                <View style={styles.subTitle}>
                  <Headline6>{modalSubtitle}</Headline6>
                </View>
                <View style={styles.spaceForStars}>
                  <Rating
                      imageSize={24}
                      startingValue={rating}
                      fractions={0}
                      ratingColor='#FFDF6B'
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
            )
          }

          {input && (
            <View style={styles.spaceForText}>
              <Input
                value={dishCategory}
                placeholder={inputPlaceholder}
              />
            </View>
          )}

          {
            bodyText!=undefined &&(
              <View style={styles.spaceForText}>
                <Body>{bodyText}</Body>
              </View>
            )

          }
        </View>

        {/* View de los BOTONEs */}
        <View
          style={[
            styles.parentView,
            styles.buttonsContainer,
            styles.spaceFromError,
          ]}>
          <ColorfulButton
            buttonContainerStyle={[styles.button, styles.cancelButton]}
            title = {textPrimaryButton}
            onPress={onClose}
          />
          <TransparentButton
            // disabled={!isValidSave}
            buttonContainerStyle={[styles.button]}
            title= {textSecondaryButton}
            onPress={onClose}
            // onPress={handleSave}
          />
        </View>
      </View>
    </Modal>
  );
}
