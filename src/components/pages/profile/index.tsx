import * as React from 'react';
import { View, Image, SectionList } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { ICONS } from '../../../constants';
import { localizedStrings } from '../../../localization/localized-strings';
import { Body, Button, Caption, ImageButton, Title } from '../../shared';
import { styles } from './styles';

interface HeaderProps {
  name: string;
  email: string;
  imageUri?: string;
}

const Header = ({}: HeaderProps) => {
  return (
    <View style={styles.personalInformationContainer}>
      <Image source={require('../../../assets/images/temporal/Ellipse.png')} />
      <View style={styles.personalNameContainer}>
        <View style={styles.profileName}>
          <Title>Lucas</Title>
          <ImageButton imageStyle={styles.editIcon} imageSvg={ICONS.edit} />
        </View>
        <Caption>lubolle@gmail.com</Caption>
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
          <View key={`btn-${index}`} style={{ marginVertical: 4 }}>
            <Button
              buttonType="transparent"
              title={buttonTitle}
              onPress={buttonAction}
              rightIcon={icon}
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
const SectionHeader = ({ title }: SectionHeaderProps) => <Body>{title}</Body>;

interface PropTypes {}
export function Profile({}: PropTypes) {
  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={Header}
        sections={data}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <Item {...item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        scrollEnabled
        contentContainerStyle={styles.sectionListContainer}
      />
    </View>
  );
}

const data = [
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
            buttonAction: () => {},
            icon: ICONS.signOut,
          },
          {
            buttonTitle: localizedStrings.profile.deleteAccount,
            buttonAction: () => {},
            icon: ICONS.trash,
          },
        ],
      },
    ],
  },
];