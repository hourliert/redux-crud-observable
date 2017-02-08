import * as qs from 'qs';

import {
  IApiUrlParams,
  IParametrizedApiUrlParams,
  IHeadersParams,
  IHeadersMap,
} from './interfaces';

export function computeCompleteUrl({
  apiProto = 'https',
  baseUrl = '/',
  version = '',
  route = '',
}: IApiUrlParams = {}): string {
  const uri = `${baseUrl}${version}${route}`
    .replace(/(\/)(?=\1)/g, ''); // delete consecutive /;

  return `${apiProto}://${uri}`;
}

export function computeParametrizedUrl({
  apiProto,
  baseUrl,
  version,
  route,
  id = '',
  queryParams = {},
}: IParametrizedApiUrlParams = {}): string {
  const url = `${
    computeCompleteUrl({ apiProto, baseUrl, version, route })
  }/${
    id.toString()
  }/?${
    qs.stringify(queryParams)
  }`
    .replace(/(\?)*$/g, ''); // delete trailing ?

  return url;
}

export function computeHeaders(params: IHeadersParams): IHeadersMap {
  return {
    Authorization: `Bearer ${params.token}`,
    ...(params.json ? { 'Content-Type': 'application/json' } : {}),
  };
}
