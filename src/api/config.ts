import Config from "react-native-config";

export const getEndpoints = () => {
  return {
    apiHostUrl: Config.API_URL,
    // web: window.location.href,
  };
};
