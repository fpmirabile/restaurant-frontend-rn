import NetInfo from '@react-native-community/netinfo';

export const hasInternetConnection = async (): Promise<boolean> => {
  const networkState = await NetInfo.fetch();
  return !!networkState.isConnected;
};

export const hasInternetConnectionListener = (
  callback: (hasConnection: boolean) => void,
): void => {
  NetInfo.addEventListener(state => {
    callback(!!state.isConnected);
  });
};
