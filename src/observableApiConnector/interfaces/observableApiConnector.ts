import { IApiConfig } from './requestFormatters';

export interface IFetchEntityParams {
  id: number|string;
  queryParams?: Object;
  config: IApiConfig;
}
