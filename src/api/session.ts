import {
  UserCredentials,
  Options,
  getGenericPassword,
  setGenericPassword,
  resetGenericPassword,
  STORAGE_TYPE,
} from 'react-native-keychain';

interface AuthSession {
  username: string;
  password: string;
}

interface TokenStorage {
  getItem: (options: Options) => Promise<UserCredentials | false> | null;
  setItem: (
    options: Options,
    value: Pick<UserCredentials, 'username' | 'password'>,
  ) => void;
  removeItem: (options: Options) => void;
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
    setItem: (options, values) =>
      tryOrNull(() =>
        setGenericPassword(values.username, values.password, options),
      ),
    removeItem: options => tryOrNull(() => resetGenericPassword(options)),
  },
};

export const getUsernameAndPassword = async (): Promise<
  AuthSession | false
> => {
  const { getItem } = getTokenStorage();
  const auth = await getItem({ storage: STORAGE_TYPE.AES });
  if (!auth) {
    return false;
  }

  return { password: auth.password, username: auth.username };
};

const getTokenStorage = () => {
  return STORAGE.session;
};

export const setSession = async ({
  username,
  password,
}: AuthSession): Promise<boolean> => {
  const current = await getUsernameAndPassword();
  if (
    current &&
    current.username === username &&
    current.password === password
  ) {
    return false;
  }

  const storage = getTokenStorage();
  if (!storage) {
    return false;
  }

  const { setItem } = storage;
  setItem({ storage: STORAGE_TYPE.AES }, { username, password });
  return true;
};

export const removeSession = () => {
  const storage = getTokenStorage();
  if (!storage) {
    return;
  }

  const { removeItem } = storage;

  removeItem({});
};
