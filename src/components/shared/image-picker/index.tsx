import * as React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image, View, FlatList } from 'react-native';
import { ICONS } from '../../../constants';
import { localizedStrings } from '../../../localization/localized-strings';
import { Body } from '../morfando-text';
import { PressableView } from '../pressable-view';
import { styles } from './styles';
import { ListRenderItemInfo } from 'react-native';
import { ImageButton } from '../image-button';

interface PropTypes {
  maxAmountOfImages: number;
}

export function ImagePicker({ maxAmountOfImages }: PropTypes) {
  const AddImageIcon = ICONS.addImage;
  const removeImageIcon = ICONS.removeImage;
  const [assets, setAssets] = React.useState<string[]>([]);

  const handlePressedMe = async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: maxAmountOfImages,
      },
      response => {
        if (response.assets) {
          const result: string[] = [];
          response.assets.forEach(asset => {
            if (asset.uri) {
              result.push(asset.uri);
            }
          });
          setAssets(result);
        }
      },
    );
  };

  const AddNewImageComponent = React.memo(() => {
    return (
      <PressableView
        onPress={handlePressedMe}
        containerStyles={styles.addPictureContainer}
        touchableStyles={styles.addPictureTouchableContainer}>
        <AddImageIcon />
        <Body style={styles.addPictureBody}>
          {localizedStrings.restaurant.create.addPictures}
        </Body>
      </PressableView>
    );
  });

  const removeAsset = (assetId: string) => () => {
    const allButCurrentAsset = assets.filter(asset => asset === assetId);
    setAssets(allButCurrentAsset);
  };

  const ImageComponent = React.memo(({ asset }: { asset: string }) => {
    return (
      <View>
        <Image style={styles.imageUploaded} source={{ uri: asset }} />
        <ImageButton onPress={removeAsset(asset)} imageSvg={removeImageIcon} />
      </View>
    );
  });

  const renderSeparatorItem = React.useCallback(() => {
    const Separator = React.memo(() => <View style={styles.separator} />);
    return <Separator />;
  }, []);

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        scrollEnabled
        horizontal
        keyExtractor={React.useCallback((item: string) => item, [])}
        data={[...assets, 'default']}
        renderItem={React.useCallback(
          ({ item }: ListRenderItemInfo<string>) => {
            return item === 'default' ? (
              <AddNewImageComponent />
            ) : (
              <ImageComponent asset={item} />
            );
          },
          [AddNewImageComponent, ImageComponent],
        )}
        ItemSeparatorComponent={renderSeparatorItem}
      />
    </View>
  );
}
