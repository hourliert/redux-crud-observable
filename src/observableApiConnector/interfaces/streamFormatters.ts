import { Observable, AjaxResponse } from 'rxjs';

export interface IFormatAjaxStreamConfig {
  isList?: boolean;
}

export interface IFormatAjaxStreamParams {
  stream$: Observable<AjaxResponse>;
  config: IFormatAjaxStreamConfig;
}
