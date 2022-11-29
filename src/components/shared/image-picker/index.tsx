import * as React from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Image, View, FlatList } from 'react-native';
import { ICONS } from '../../../constants';
import { localizedStrings } from '../../../localization/localized-strings';
import { Caption } from '../morfando-text';
import { PressableView } from '../pressable-view';
import { ListRenderItemInfo } from 'react-native';
import { ImageButton } from '../image-button';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { styles } from './styles';
import { TouchableText } from '../touchable-text';
import { requestCameraPermission } from '../../../util/permissions';

interface PropTypes {
  onImageAdded?: (images: string[]) => void;
  maxAmountOfImages: number;
  previousImages?: string[];
}

export function ImagePicker({
  maxAmountOfImages,
  onImageAdded,
  previousImages,
}: PropTypes) {
  const actionSheetRef = React.useRef<ActionSheetRef | null>(null);
  const AddImageIcon = ICONS.addImage;
  const removeImageIcon = ICONS.removeImage;
  const [assets, setAssets] = React.useState<string[]>(
    previousImages && previousImages.length > 0 ? previousImages : [],
  );

  const handlePressedMe = async () => {
    actionSheetRef.current?.show();
  };

  const handleOpenGallery = React.useCallback(async () => {
    await requestCameraPermission();
    launchImageLibrary(
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
          if (onImageAdded) {
            onImageAdded(result);
          }
          setAssets(result);
        }
      },
    );
    actionSheetRef.current?.hide();
  }, [onImageAdded, maxAmountOfImages]);

  const handleOpenCamera = React.useCallback(() => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        cameraType: 'back',
      },
      response => {
        if (response.assets) {
          const result: string[] =
            assets.length > 5 ? [...assets.slice(0, -1)] : [...assets];
          response.assets.forEach(asset => {
            if (asset.uri) {
              result.push(asset.uri);
            }
          });
          if (onImageAdded) {
            onImageAdded(result);
          }
          setAssets(result);
        }
      },
    );
    actionSheetRef.current?.hide();
  }, [onImageAdded, assets]);

  const AddNewImageComponent = React.memo(() => {
    return (
      <PressableView
        onPress={handlePressedMe}
        containerStyles={styles.addPictureContainer}
        touchableStyles={styles.addPictureTouchableContainer}>
        <AddImageIcon />
        <Caption style={styles.addPictureBody}>
          {localizedStrings.restaurant.create.addPictures}
        </Caption>
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
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.bottomSheetChildrenContainer}>
          <TouchableText
            containerStyles={styles.bottomSheetButton}
            onPress={handleOpenCamera}
            message="Camara"
          />
          <TouchableText
            containerStyles={styles.bottomSheetButton}
            onPress={handleOpenGallery}
            message="Galeria"
          />
        </View>
      </ActionSheet>
    </View>
  );
}
