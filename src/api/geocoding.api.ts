import { externalApi } from './config/common';

type LonAndLatResponse = {
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    formatted_address: string;
    geometry: {
      bounds: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
      location: {
        lat: string;
        lng: string;
      };
    };
  }[];
  status: 'OK' | 'ERROR';
};

const getLatAndLon = async (address: string): Promise<LonAndLatResponse> => {
  const key = 'AIzaSyCh1DHxBtJqrQRTt1dr7H3FXBEmWsaRzzY';
  const escapedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${escapedAddress}&key=${encodeURIComponent(
    key,
  )}`;

  return await externalApi(url, {
    method: 'GET',
  });
};

export const geolocationAPI = {
  getLatAndLon,
};
