import * as React from 'react';
import { View } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Headline5,Headline6, Body } from '../morfando-text';
import { Input } from '../text-input';
import { ICONS } from '../../../constants';
import { ImageButton } from '../image-button';
import { styles } from './styles';
import { Value } from 'sass';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { Image } from 'react-native';

interface PropTypes {
  user: string,
  comment:string,
  stars:number,
  profilePhoto?:string,
//   // onSavePressed: (isClosed: boolean, formData: TimeInput[]) => void;
//   // formData?: TimeInput[];
//   isOpened?: boolean;
}


// // type TimeFields = keyof TimeInput;
export function UserComment({
user,
comment,
stars,
profilePhoto,
}: PropTypes) {

  //HOOKS
  const [rating,updateRating] = React.useState<number>(0);


  return (
    <View style={styles.commentStyle}>
      <View style={styles.profilePhoto}>
        <Image
        source={require('../../../assets/images/icons/test-image.jpg')}
        style={styles.imageStyle}
        />
      </View>
      <View style={styles.textStyle}>
        <Body darkPinkColor fontType='bold'>{user}</Body>
        <Body>{comment}</Body>
        <View style={styles.starsSpace}>
          <Rating
          imageSize={16}
          startingValue={stars}
          fractions={0}
          ratingColor='#FFDF6B'
          />
        </View>
      </View>
     
    </View>

    // <Modal 
    // isVisible={isVisible} 
    // style={styles.modalStyles}>             
    //   <View style={styles.containerView}>
    //     <View style={[styles.parentView, styles.modalTitleContainer]}>
    //       <Headline5>{modalTitle}</Headline5>
    //       <ImageButton
    //         imageStyle={styles.closeIcon}
    //         onPress={onClose}
    //         imageSvg={ICONS.closeIcon}
    //       />
    //     </View>
    //     <View>
    //       {
    //         modalSubtitle!=undefined &&(
    //           <View>
    //             <View style={styles.subTitle}>
    //               <Headline6>{modalSubtitle}</Headline6>
    //             </View>
    //             <View style={styles.spaceForStars}>

    //             </View>
    //             <View style={styles.spaceForText}>
    //               <Input
    //                 value={restaurantReview}
    //                 placeholder={'Ingrese su comentario sobre el resaturante'}
    //               />
    //             </View>
    //           </View>
    //         )
    //       }

    //       {input && (
    //         <View style={styles.spaceForText}>
    //           <Input
    //             value={dishCategory}
    //             placeholder={inputPlaceholder}
    //           />
    //         </View>
    //       )}

    //       {
    //         bodyText!=undefined &&(
    //           <View style={styles.spaceForText}>
    //             <Body>{bodyText}</Body>
    //           </View>
    //         )

    //       }
    //     </View>

    //     {/* View de los BOTONEs */}
    //     <View
    //       style={[
    //         styles.parentView,
    //         styles.buttonsContainer,
    //         styles.spaceFromError,
    //       ]}>
    //       <ColorfulButton
    //         buttonContainerStyle={[styles.button, styles.cancelButton]}
    //         title = {textPrimaryButton}
    //         onPress={onClose}
    //       />
    //       <TransparentButton
    //         // disabled={!isValidSave}
    //         buttonContainerStyle={[styles.button]}
    //         title= {textSecondaryButton}
    //         onPress={onClose}
    //         // onPress={handleSave}
    //       />
    //     </View>
    //   </View>
    // </Modal>
  );
}
