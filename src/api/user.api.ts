import {
  authenticatedDelete,
  authenticatedGet,
  authenticatedPost,
  authenticatedPut,
} from './config/calls';

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
  console.log('register', email, name, password, repeatPassword);
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

const loginSso = async ({
  idToken,
  email,
}: {
  idToken: string;
  email: string;
}) => {
  return authenticatedPost('/login/sso', {
    idToken,
    email,
    provider: 'google',
  });
};

const changePassword = async (email: string, password: string) => {
  return authenticatedPut('/user/password', {
    email,
    password,
  });
};

const deleteUser = async () => {
  return authenticatedDelete('/users');
};

export const UserAPI = {
  loginCredentials,
  loginSso,
  me,
  registerNewOwner,
  deleteUser,
  changePassword,
};
