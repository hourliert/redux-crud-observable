import { IApiConfig } from 'observableApiConnector';

export default function computeApiConfig(base: IApiConfig, override?: IApiConfig): IApiConfig {
  return override ?
    Object.assign<Object, IApiConfig, IApiConfig>({}, base, override) :
    base;
}
