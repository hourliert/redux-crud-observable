import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { formatAjaxStream } from './streamFormatters';
import { computeHeaders, computeParametrizedUrl } from './requestFormatters';

import {
  IFetchEntityParams,
  IFetchEntitiesListParams,
} from './interfaces';

export function fetchEntity({
  id,
  queryParams,
  config: { token, json, ...apiParams },
}: IFetchEntityParams): Observable<any> {
  return formatAjaxStream(ajax({
    crossDomain: true,
    headers: computeHeaders({ token, json }),
    method: 'GET',
    responseType: 'json',
    url: computeParametrizedUrl({ id, queryParams, ...apiParams }),
  }));
}

export function fetchEntitiesList({
  queryParams,
  config: { token, json, ...apiParams },
}: IFetchEntitiesListParams): Observable<any> {
  return formatAjaxStream(ajax({
    crossDomain: true,
    headers: computeHeaders({ token, json }),
    method: 'GET',
    responseType: 'json',
    url: computeParametrizedUrl({ queryParams, ...apiParams }),
  }));
}
