import { Observable, AjaxResponse } from 'rxjs';

export interface IApiUrlParams {
  baseUrl?: string;
  version?: string;
  route?: string;
}

export interface IParametrizedApiUrlParams extends IApiUrlParams {
  apiProto?: string;
  id?: string;
  queryParams?: string;
}

export interface IHeadersParams {
  token?: string;
  json?: boolean;
}

export interface IHeadersMap {
  [index: string]: string;
}

export interface IFormatAjaxStreamConfig {
  isList?: boolean;
}

export interface IFormatAjaxStreamParams {
  stream$: Observable<AjaxResponse>;
  config: IFormatAjaxStreamConfig;
}
