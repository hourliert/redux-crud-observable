import { IApiConfig } from './requestFormatters';

export interface IRequestParams {
  queryParams?: Object;
  config: IApiConfig;
}

export interface IAjaxStreamParams extends ICrudActions {
  method: string;
  responseType?: string;
}

export interface ICrudActions extends IRequestParams {
  id?: number|string;
  body?: any;
}
