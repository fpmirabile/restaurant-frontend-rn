import * as React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { ColorfulButton, TransparentButton } from '../button';
import { Headline5, Headline6, Body } from '../morfando-text';
import { styles } from './styles';

interface PropTypes {
  isVisible: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  modalTitle: string;
  modalSubtitle?: string;
  confirmText?: string;
  textPrimaryButton: string;
  textSecondaryButton: string;
}

export function ConfirmModal({
  isVisible,
  onConfirm,
  onCancel,
  modalTitle,
  modalSubtitle,
  confirmText,
  textPrimaryButton,
  textSecondaryButton,
}: PropTypes) {
  return (
    <Modal isVisible={isVisible} style={styles.modalStyles}>
      <View style={styles.containerView}>
        <View style={[styles.parentView, styles.modalTitleContainer]}>
          <Headline5>{modalTitle}</Headline5>
        </View>
        <View>
          {!!modalSubtitle && (
            <View>
              <View style={styles.subTitle}>
                <Headline6>{modalSubtitle}</Headline6>
              </View>
            </View>
          )}

          {!!confirmText && (
            <View style={styles.spaceForText}>
              <Body>{confirmText}</Body>
            </View>
          )}
        </View>

        <View
          style={[
            styles.parentView,
            styles.buttonsContainer,
            styles.spaceFromError,
          ]}>
          <ColorfulButton
            buttonContainerStyle={[styles.button, styles.cancelButton]}
            title={textPrimaryButton}
            onPress={onConfirm}
          />
          <TransparentButton
            buttonContainerStyle={[styles.button]}
            title={textSecondaryButton}
            onPress={onCancel}
          />
        </View>
      </View>
    </Modal>
  );
}
