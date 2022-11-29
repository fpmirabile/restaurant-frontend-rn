import Toast, { ToastShowParams } from 'react-native-toast-message';

export const showPersonalizedToast = (params: ToastShowParams) => {
  Toast.show(params);
};
