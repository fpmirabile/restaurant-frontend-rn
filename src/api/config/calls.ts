import { authenticatedApi, getHeaders, postHeaders } from './common';

export const authenticatedGet = (
  url: string,
  args: RequestInit = {},
  token?: string,
) =>
  authenticatedApi(
    url,
    {
      method: 'GET',
      headers: getHeaders,
      ...args,
    },
    { token: token },
  );

export const authenticatedPost = (
  url: string,
  payload: any = {},
  args: RequestInit = {},
  token?: string,
) =>
  authenticatedApi(
    url,
    {
      method: 'POST',
      headers: postHeaders,
      body: JSON.stringify(payload),
      ...args,
    },
    { token: token },
  );

export const authenticatedPut = (
  url: string,
  payload: any = {},
  args: RequestInit = {},
  token?: string,
) =>
  authenticatedApi(
    url,
    {
      method: 'PUT',
      headers: postHeaders,
      body: JSON.stringify(payload),
      ...args,
    },
    { token: token },
  );

export const authenticatedDelete = (
  url: string,
  payload: any = {},
  args: RequestInit = {},
  token?: string,
) =>
  authenticatedApi(
    url,
    {
      method: 'DELETE',
      headers: postHeaders,
      body: JSON.stringify(payload),
      ...args,
    },
    { token: token },
  );

export const authenticatedPatch = (
  url: string,
  payload: any = {},
  args: RequestInit = {},
  token?: string,
) =>
  authenticatedApi(
    url,
    {
      method: 'PATCH',
      headers: postHeaders,
      body: JSON.stringify(payload),
      ...args,
    },
    { token: token },
  );
