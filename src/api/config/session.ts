import {
  UserCredentials,
  Options,
  getGenericPassword,
  setGenericPassword,
  resetGenericPassword,
  STORAGE_TYPE,
} from 'react-native-keychain';

interface JwtSession {
  jwt: string;
  refreshToken: string;
}

interface TokenStorage {
  getItem: (options?: Options) => Promise<UserCredentials | false> | null;
  setItem: (
    value: Pick<UserCredentials, 'username' | 'password'>,
    options?: Options,
  ) => void;
  removeItem: (options?: Options) => void;
}

interface TokenStorageMap {
  session: TokenStorage;
}

const tryOrNull = <T>(f: () => T) => {
  try {
    return f();
  } catch {
    return null;
  }
};

const STORAGE: TokenStorageMap = {
  session: {
    getItem: options =>
      tryOrNull(async () => await getGenericPassword(options)),
    setItem: (values, options) =>
      tryOrNull(() =>
        setGenericPassword(values.username, values.password, options),
      ),
    removeItem: options => tryOrNull(() => resetGenericPassword(options)),
  },
};

export const getSession = async (): Promise<JwtSession | false> => {
  const { getItem } = getTokenStorage();
  const auth = await getItem({ storage: STORAGE_TYPE.AES });
  if (!auth) {
    return false;
  }

  return { jwt: auth.username, refreshToken: auth.password };
};

const getTokenStorage = () => {
  return STORAGE.session;
};

export const setSession = async ({
  jwt,
  refreshToken,
}: JwtSession): Promise<boolean> => {
  const current = await getSession();
  if (current && current.jwt === jwt && current.refreshToken === refreshToken) {
    return false;
  }

  const storage = getTokenStorage();
  if (!storage) {
    return false;
  }

  const { setItem } = storage;
  setItem(
    { username: jwt, password: refreshToken },
    { storage: STORAGE_TYPE.AES },
  );
  return true;
};

export const removeSession = () => {
  const storage = getTokenStorage();
  if (!storage) {
    return;
  }

  const { removeItem } = storage;
  removeItem({ storage: STORAGE_TYPE.AES });
};
