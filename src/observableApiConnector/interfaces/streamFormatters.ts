import { Observable, AjaxResponse } from 'rxjs';

export interface IFormatAjaxStreamConfig {
  isList?: boolean;
}

export interface IFormatAjaxStreamParams extends Observable<AjaxResponse> {}
