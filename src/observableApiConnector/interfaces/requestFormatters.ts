export interface IApiUrlParams {
  apiProto?: string;
  baseUrl?: string;
  version?: string;
  route?: string;
}

export interface IParametrizedApiUrlParams extends IApiUrlParams {
  id?: string;
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

