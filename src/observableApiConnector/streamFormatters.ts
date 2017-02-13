import { Observable, AjaxResponse, AjaxError } from 'rxjs';
import { ApiError, IApiError } from 'errors';

import {
  IFormatAjaxStreamParams,
} from './interfaces';

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

export function formatAjaxStream(stream$: IFormatAjaxStreamParams): Observable<any> {
  return stream$
    .map(value => formatResponse(value))
    .catch(error => Observable.throw(formatError(error)));
}
