import { Observable, AjaxResponse, AjaxError } from 'rxjs';
import { ApiError, IApiError } from 'errors';

import {
  IFormatAjaxStreamParams,
} from './interfaces';

function addTimestampTo(response: any): any {
  const newResponse = response;
  newResponse.requestedAt = new Date();

  return newResponse;
}

function addTimestampToList(response: any): any {
  const newResponse = response;
  const member = newResponse.member.map((i: any) => addTimestampTo(i));

  newResponse.member = member;

  return newResponse;
}

export function formatResponse(ajaxResponse: AjaxResponse): any {
  return ajaxResponse.response;
}

export function formatError(ajaxError: AjaxError): IApiError {
  const error = new ApiError(ajaxError.message);

  if (ajaxError.xhr) {
    error.data = ajaxError.xhr.response;
    error.status = ajaxError.xhr.status;
  }

  return error;
}

export function formatAjaxStream(params: IFormatAjaxStreamParams): Observable<any> {
  if (!params.config) throw new Error('Missing config parameter');
  if (!params.stream$) throw new Error('Missing stream$ parameter');

  return params.stream$
    .map(value => formatResponse(value))
    // todo: consider if this is a good practice to keep that here
    .map(value => (params.config.isList ? addTimestampToList : addTimestampTo)(value))
    .catch(error => Observable.throw(formatError(error)));
}
