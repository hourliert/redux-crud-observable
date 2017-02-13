export type ApiProto = 'http' | 'https';

export interface IApiUrlParams {
  apiProto: ApiProto;
  baseUrl: string;
  version: string;
  route: string;
}

export interface IParametrizedApiUrlParams extends IApiUrlParams {
  id?: number|string;
  queryParams?: Object;
}

export interface IHeadersParams {
  token?: string;
  json?: boolean;
}

export interface IHeadersMap {
  [index: string]: string;
}

export interface IApiConfig extends IApiUrlParams, IHeadersParams {}

