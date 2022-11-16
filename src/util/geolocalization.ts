import { type Permission, PermissionsAndroid } from 'react-native';

type PermissionRequest = {
  permission: Permission;
  onOk?: () => void;
  onNotAccepted?: () => void;
  onError?: () => void;
};
export const tryRequestGeoPermissions = async ({
  permission,
  onError,
  onNotAccepted,
  onOk,
}: PermissionRequest): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: 'Acceder a gps',
      message: 'Necesitamos saber donde estas parado',
      buttonPositive: 'Aceptar',
    });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('OK');
      !!onOk && onOk();
      return true;
    } else {
      console.log('NO');
      !!onNotAccepted && onNotAccepted();
      return false;
    }
  } catch (error) {
    console.log(error);
    !!onError && onError();
    return false;
  }
};
