import { IApiConfig } from './requestFormatters';

export interface IRequestParams {
  queryParams?: Object;
  config: IApiConfig;
}

export interface IFetchEntityParams extends IRequestParams {
  id?: number|string;
}
