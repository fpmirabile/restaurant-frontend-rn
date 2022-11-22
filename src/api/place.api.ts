import { authenticatedGet } from './config/calls';

export interface Locality {
  id: number;
  localidad: string;
}
const getLocalities = async (idProvincia: number): Promise<Locality[]> => {
  return authenticatedGet(`/provincia/${idProvincia}/localidades`);
};

export interface Province {
  id: number;
  provincia: string;
}
const getStates = async (): Promise<Province[]> => {
  return authenticatedGet('/provincias');
};

export const PlaceAPI = {
  getLocalities,
  getStates,
};
