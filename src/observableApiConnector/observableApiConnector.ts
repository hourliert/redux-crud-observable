import { Observable, AjaxResponse, AjaxError } from 'rxjs';
// import { ajax } from 'rxjs/observable/dom/ajax';
import * as qs from 'qs';
import { ApiError, IApiError } from 'errors';

import {
  IApiUrlParams,
  IParametrizedApiUrlParams,
  IHeadersParams,
  IHeadersMap,
  IFormatAjaxStreamParams,
} from './interfaces';

function computeCompleteUrl({
  baseUrl = '/',
  version = '',
  route = '',
}: IApiUrlParams = {}): string {
  return `${baseUrl}${version}${route}`;
}

function computeParametrizedUrl({
  apiProto,
  baseUrl,
  version,
  route,
  id = '',
  queryParams = {},
}: IParametrizedApiUrlParams = {}): string {
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

function computeHeaders(params: IHeadersParams): IHeadersMap {
  return {
    Authorization: `Bearer ${params.token}`,
    ...(params.json ? { 'Content-Type': 'application/json' } : {}),
  };
}

function formatResponse(ajaxResponse: AjaxResponse): any {
  return ajaxResponse.response;
}

function formatError(ajaxError: AjaxError): IApiError {
  const error = new ApiError(ajaxError.message);

  if (ajaxError.xhr) {
    error.data = ajaxError.xhr.response;
    error.status = ajaxError.xhr.status;
  }

  return error;
}

function formatAjaxStream(params: IFormatAjaxStreamParams): Observable<any> {
  if (!params.config) throw new Error('Missing config parameter');

  return params.stream$
    .map(value => formatResponse(value))
    // .map(value => (params.config.isList ? addRequestedAtToList : addRequestedAtTo)(value))
    .catch(error => Observable.throw(formatError(error)));
}

console.log(computeParametrizedUrl, computeHeaders, formatAjaxStream);

// export function fetchEntity({
//   id,
//   queryParams,
//   config: { apiProto, baseUrl, version, route, token, json } = {},
// }: IFetchEntityParams = {}) {
//   return formatAjaxStream(
//     ajax({
//       crossDomain: true,
//       headers: computeHeaders({ token, json }),
//       method: 'GET',
//       responseType: 'json',
//       url: computeParametrizedUrl({ apiProto, baseUrl, version, route, id, queryParams }),
//     }),
//   );
// }
