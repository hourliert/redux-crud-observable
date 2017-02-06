import * as qs from 'qs';

import {
  IApiUrlParamters,
  IParametrizedApiUrlParamters,
} from './interfaces';

function computeCompleteUrl({
  apiProto = 'http',
  baseUrl = '/',
  version = '',
  route = '',
}: IApiUrlParamters = {}): string {
  return `${apiProto}://${baseUrl}${version}${route}`;
}

function computeParametrizedUrl({
  apiProto,
  baseUrl,
  version,
  route,
  id = '',
  queryParams = {},
}: IParametrizedApiUrlParamters = {}): string {
  const uri = `${
    computeCompleteUrl({ baseUrl, version, route })
  }/${
    id.toString()
  }/?${
    qs.stringify(queryParams)
  }`
    .replace(/(\/)(?=\1)/g, '') // delete consecutive /
    .replace(/(\?)*$/g, ''); // delete trailing ?

  const url = `${apiProto}://${uri}`;

  return url;
}
