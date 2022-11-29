import { PermissionsAndroid } from 'react-native';

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Acceder a tu camara',
        message:
          'Necesitamos acceder a tu camara para darte una mejor experiencia de usuario',
        buttonPositive: 'Aceptar',
        buttonNegative: 'Cancelar',
      },
    );

    const grantedGallery = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Guardar fotos en tu galeria',
        message:
          'Necesitamos guardar fotos en tu galeria para darte una mejor experiencia de usuario',
        buttonNegative: 'Cancel',
        buttonPositive: 'Aceptar',
      },
    );

    if (
      granted === PermissionsAndroid.RESULTS.GRANTED &&
      grantedGallery === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('OK');
      return true;
    } else {
      console.log('NO');
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
