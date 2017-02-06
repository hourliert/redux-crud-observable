export interface IApiUrlParamters {
  apiProto?: string;
  baseUrl?: string;
  version?: string;
  route?: string;
}

export interface IParametrizedApiUrlParamters extends IApiUrlParamters {
  id?: string;
  queryParams?: string;
}
