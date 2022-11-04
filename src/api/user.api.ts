import { authenticatedGet, authenticatedPost } from './config/calls';

export interface User {
  id: string;
  name: string;
  email: string;
}

type RegisterParams = {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
};
const registerNewOwner = async ({
  email,
  name,
  password,
  repeatPassword,
}: RegisterParams) => {
  return authenticatedPost('/register', {
    email,
    name,
    password,
    confirmPassword: repeatPassword,
  });
};

const me = async (): Promise<User> => {
  return authenticatedGet('/me');
};

type LoginCredentialsRequest = {
  username: string;
  password: string;
};
type LoginCredentialsResponse = {
  token: string;
  refreshToken: string;
};
const loginCredentials = async ({
  username,
  password,
}: LoginCredentialsRequest): Promise<LoginCredentialsResponse> => {
  return authenticatedPost('/login', { email: username, password });
};

export const UserAPI = {
  loginCredentials,
  me,
  registerNewOwner,
};
