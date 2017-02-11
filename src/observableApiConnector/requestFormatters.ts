import * as qs from 'qs';

import {
  IApiUrlParams,
  IParametrizedApiUrlParams,
  IHeadersParams,
  IHeadersMap,
} from './interfaces';

export function computeCompleteUrl({ apiProto, baseUrl, version, route }: IApiUrlParams = {
  apiProto: 'https',
  baseUrl: 'www.example.com',
  route: '/',
  version: '/v1',
}): string {
  const uri = `${baseUrl}${version}${route}`
    .replace(/(\/)(?=\1)/g, ''); // delete consecutive /;

  return `${apiProto}://${uri}`;
}

export function computeParametrizedUrl({
  id,
  queryParams,
  ...apiUrlParams,
}: IParametrizedApiUrlParams): string {
  let url = `${
    computeCompleteUrl(apiUrlParams)
  }`;

  if (id) {
    url = url.concat(`/${id.toString()}`);
  }

  if (queryParams) {
    url = url.concat(`/?${qs.stringify(queryParams)}`);
  }

  url = url.replace(/(\?)*$/g, ''); // delete trailing ?

  return url;
}

export function computeHeaders(params: IHeadersParams): IHeadersMap {
  return {
    ...(params.token ? { Authorization: `${params.token}` } : {}),
    ...(params.json ? { 'Content-Type': 'application/json' } : {}),
  };
}
