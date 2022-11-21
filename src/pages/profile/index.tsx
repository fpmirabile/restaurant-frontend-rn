import * as React from 'react';
import { View, Image, SectionList } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { ICONS } from '../../constants';
import { localizedStrings } from '../../localization/localized-strings';
import {
  CTAText,
  TransparentButton,
  Caption,
  ImageButton,
  Title,
} from '../../components/shared';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions } from '../../redux';
import { ConfirmModal } from '../../components/shared/confirm-modal';

interface HeaderProps {
  name: string;
  email: string;
  imageUri?: string;
}

const Header = ({}: HeaderProps) => {
  const {
    user: { name, email },
  } = useAppSelector(state => state.user);
  return (
    <View style={styles.personalInformationContainer}>
      <Image source={require('../../assets/images/temporal/Ellipse.png')} />
      <View style={styles.personalNameContainer}>
        <View style={styles.profileName}>
          <Title>{name}</Title>
          <ImageButton imageStyle={styles.editIcon} imageSvg={ICONS.edit} />
        </View>
        <Caption>{email}</Caption>
      </View>
    </View>
  );
};

interface ItemProps {
  id: number;
  buttons: {
    buttonTitle: string;
    buttonAction: () => void;
    icon: React.FC<SvgProps>;
  }[];
}

const Item = React.memo(({ buttons }: ItemProps) => {
  return (
    <View>
      {buttons.map(({ buttonAction, buttonTitle, icon }, index) => {
        return (
          <View key={`btn-${index}`} style={styles.buttonContainer}>
            <TransparentButton
              title={buttonTitle}
              onPress={buttonAction}
              rightIcon={icon}
              size="big"
            />
          </View>
        );
      })}
    </View>
  );
});

interface SectionHeaderProps {
  title: string;
}
const SectionHeader = ({ title }: SectionHeaderProps) => (
  <CTAText>{title}</CTAText>
);

interface PropTypes {}
export function Profile({}: PropTypes) {
  const dispatch = useAppDispatch();

  //Modal de confirmacion para eliminar cuenta
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

  const showConfirmModal = async () => {
    setModalVisible(true);
  };

  const handleConfirmModal = async () => {
    setModalVisible(false);
    dispatch(actions.userActions.deleteUser());
  };

  const hideConfirmModal = async () => {
    setModalVisible(false);
  };

  const getProfileInformation = React.useCallback(
    () => [
      {
        title: localizedStrings.profile.myFavRestaurants,
        data: [
          {
            id: 1,
            buttons: [
              {
                buttonTitle: localizedStrings.profile.myLikes,
                buttonAction: () => {},
                icon: ICONS.like,
              },
            ],
          },
        ],
      },
      {
        title: localizedStrings.profile.legalInfo,
        data: [
          {
            id: 2,
            buttons: [
              {
                buttonTitle: localizedStrings.profile.tAndCond,
                buttonAction: () => {},
                icon: ICONS.info2,
              },
            ],
          },
        ],
      },
      {
        title: localizedStrings.profile.accountManagement,
        data: [
          {
            id: 3,
            buttons: [
              {
                buttonTitle: localizedStrings.profile.signOut,
                buttonAction: () => dispatch(actions.userActions.logOut()),
                icon: ICONS.signOut,
              },
              {
                buttonTitle: localizedStrings.profile.deleteAccount,
                buttonAction: () => dispatch(showConfirmModal),
                icon: ICONS.trash,
              },
            ],
          },
        ],
      },
    ],
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={Header}
        sections={getProfileInformation()}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <Item {...item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        scrollEnabled
        contentContainerStyle={styles.sectionListContainer}
      />
      <ConfirmModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmModal}
        onCancel={hideConfirmModal}
        modalTitle={'Usted esta por eliminar su cuenta'}
        confirmText={'¿Esta seguro que desea eliminar su cuenta?'}
        textPrimaryButton={localizedStrings.login.confirm}
        textSecondaryButton={localizedStrings.login.cancel}
      />
    </View>
  );
}
