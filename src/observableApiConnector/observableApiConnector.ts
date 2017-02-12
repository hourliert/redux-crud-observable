import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { formatAjaxStream } from './streamFormatters';
import { computeHeaders, computeParametrizedUrl } from './requestFormatters';

import {
  ICrudActions,
  IAjaxStreamParams,
} from './interfaces';

export function createAjaxStream({
  id,
  queryParams,
  method,
  body,
  responseType,
  config: { token, json, ...apiParams },
}: IAjaxStreamParams): Observable<any> {
  return formatAjaxStream(ajax({
    crossDomain: true,
    method,
    responseType,
    body,
    headers: computeHeaders({ token, json }),
    url: computeParametrizedUrl({ id, queryParams, ...apiParams }),
  }));
}

export function fetchEntity(params: ICrudActions): Observable<any> {
  return createAjaxStream({
    method: 'GET',
    responseType: 'json',
    ...params,
  });
}

export function deleteEntity(params: ICrudActions): Observable<any> {
  return createAjaxStream({
    method: 'DELETE',
    ...params,
  });
}

export function updateEntity(params: ICrudActions): Observable<any> {
  return createAjaxStream({
    method: 'PUT',
    responseType: 'json',
    ...params,
  });
}

export function createEntity(params: ICrudActions): Observable<any> {
  return createAjaxStream({
    method: 'POST',
    responseType: 'json',
    ...params,
  });
}


