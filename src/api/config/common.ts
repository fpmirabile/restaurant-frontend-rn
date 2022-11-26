import { getEndpoints } from './config';
import { getSession, setSession } from './session';

export interface AuthenticatedApiOptions {
  checkTokenExpiration?: ResponseHandler;
  token?: string;
}

export interface ErrorResponse {
  response: Response;
  url: string;
}

export type DeleteResponse = {
  operation: boolean;
};

export type ResponseHandler = (response: Response) => Promise<Response>;
export const getHeaders = {
  Accept: 'application/json',
};
export const postHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

const formatResponse = (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (!contentType || contentType.indexOf('application/json') >= 0) {
    return response.json().catch(() => {
      // TODO:
    });
  }

  return response;
};

const withAuthenticationToken = async (
  headers: HeadersInit_,
  token?: string,
) => {
  const session = await getSession();
  const jwt = token || (session && session.jwt);
  if (!jwt) {
    return headers;
  }

  return {
    ...headers,
    Authorization: `${jwt}`,
  };
};

export const authenticatedApi = async (
  url: string,
  args: RequestInit = {},
  options: AuthenticatedApiOptions = {},
) => {
  const { checkTokenExpiration, token } = options || {};
  args.headers = await withAuthenticationToken(args.headers || {}, token);

  return api(url, args, checkTokenExpiration).catch((err: ErrorResponse) => {
    console.log('error during calling', JSON.stringify(err));
    return err.response.json().then(errResponse => {
      throw errResponse;
    });
  });
};

export const api = (
  url: string,
  args: RequestInit = {},
  checkTokenExpirationFn: ResponseHandler = checkTokenExpiration,
) => {
  let absoluteUrl = url;
  if (!url.startsWith('/')) {
    absoluteUrl = `/${url}`;
  }

  const finalUrl = `${getEndpoints().apiHostUrl}${absoluteUrl}`;
  return fetch(finalUrl, args)
    .catch(r => {
      throw r;
    })
    .then(checkStatus)
    .then(checkTokenExpirationFn)
    .then(formatResponse)
    .catch(error => {
      console.log(
        `Hubo un problema con la petición Fetch a ${finalUrl}. Error: ${error.message}`,
      );
      throw error;
    });
};

export const externalApi = (url: string, args: RequestInit = {}) => {
  return fetch(url, args)
    .catch(r => {
      throw r;
    })
    .then(checkStatus)
    .then(formatResponse)
    .catch(error => {
      console.log(
        `Hubo un problema con la petición Fetch a ${url}. Error: ${error}`,
      );
      throw error;
    });
};

export const refreshToken = async () => {
  const token = await getSession();
  const options = {
    method: 'POST',
    headers: await withAuthenticationToken(postHeaders),
    body: JSON.stringify({
      refreshToken: token && token.refreshToken,
    }),
  };

  const url = `${getEndpoints().apiHostUrl}/login/refresh`;
  return fetch(url, options)
    .then(checkStatus)
    .then(formatResponse)
    .then(session => {
      console.log('session', session);
      const { token: newToken, refreshToken: newRefresh } = session;
      setSession({
        jwt: newToken,
        refreshToken: newRefresh,
      });
      return session;
    })
    .catch(async err => {
      if (err.response.status === 401) {
        // Necesito mandarlo al login o hacer nada
        return;
      }
      console.log('Error trying to refresh token');
    });
};

const checkTokenExpiration = async (response: Response) => {
  const token = await getSession();
  // La api aun no devuelve esto
  if (
    response.headers &&
    response.headers.get('x-jwt-refresh') &&
    token &&
    token.refreshToken
  ) {
    refreshToken();
  }

  return response;
};

const checkStatus = (response: Response) => {
  if (response.ok) {
    return response;
  }

  const error = new Error(response.statusText);
  (error as any).response = response;
  throw error;
};

export const createQueryString = (
  data: any,
  ignoreFields: string[] = [],
): string => {
  if (typeof data !== 'object') {
    return '';
  }

  let result = '?';
  Object.keys(data).forEach(oKey => {
    if (!ignoreFields.includes(oKey) && data[oKey]) {
      result += `${oKey}=${encodeURIComponent(data[oKey])}&`;
    }
  });

  if (result.endsWith('&')) {
    result = result.substring(0, result.length - 1);
  }

  return result;
};
