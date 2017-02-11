import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { formatAjaxStream } from './streamFormatters';
import { computeHeaders, computeParametrizedUrl } from './requestFormatters';

import {
  IFetchEntityParams,
} from './interfaces';

export function fetchEntity({
  id,
  queryParams,
  config: { token, json, ...apiParams },
}: IFetchEntityParams): Observable<any> {
  return formatAjaxStream({
    config: { isList: false },
    stream$: ajax({
      crossDomain: true,
      headers: computeHeaders({ token, json }),
      method: 'GET',
      responseType: 'json',
      url: computeParametrizedUrl({ id, queryParams, ...apiParams }),
    }),
  });
}
