import { IApiConfig } from 'observableApiConnector';

export interface IFetchEntityEpicParams {
  entity: string;
  apiConfig?: IApiConfig;
}
