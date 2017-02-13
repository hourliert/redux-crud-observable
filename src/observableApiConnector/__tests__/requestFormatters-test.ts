import { computeCompleteUrl, computeParametrizedUrl, computeHeaders } from '../requestFormatters';

import { IApiUrlParams, IParametrizedApiUrlParams } from '../interfaces';

describe('requestFormatters', () => {
  it('computes a complete url', () => {
    const params: IApiUrlParams = {
      apiProto: 'https',
      baseUrl: 'api.starwars.galaxy',
      route: '/jedis',
      version: '/v1',
    };

    expect(computeCompleteUrl(params)).toEqual('https://api.starwars.galaxy/v1/jedis');
  });

  it('computes a complete url without consecutive slash', () => {
    const params: IApiUrlParams = {
      apiProto: 'https',
      baseUrl: 'api.starwars.galaxy',
      route: '///jedis////',
      version: '/v1///',
    };

    expect(computeCompleteUrl(params)).toEqual('https://api.starwars.galaxy/v1/jedis/');
  });

  it('computes a complete url without parameters', () => {
    const params: IParametrizedApiUrlParams = {
      apiProto: 'https',
      baseUrl: 'api.starwars.galaxy',
      route: '/jedis',
      version: '/v1',
    };

    expect(computeParametrizedUrl(params)).toEqual('https://api.starwars.galaxy/v1/jedis');
  });

  it('computes a complete url with parameters', () => {
    const params: IParametrizedApiUrlParams = {
      apiProto: 'https',
      baseUrl: 'api.starwars.galaxy',
      id: '5',
      queryParams: {},
      route: '////jedis',
      version: '///v1',
    };

    expect(computeParametrizedUrl(params)).toEqual('https://api.starwars.galaxy/v1/jedis/5/');
  });

  it('computes a complete url with parameters', () => {
    const params: IParametrizedApiUrlParams = {
      apiProto: 'https',
      baseUrl: 'api.starwars.galaxy',
      id: '5',
      queryParams: { hasForce: true },
      route: '/jedis',
      version: '/v1',
    };

    expect(computeParametrizedUrl(params)).toEqual('https://api.starwars.galaxy/v1/jedis/5/?hasForce=true');
  });

  it('computes empty header parameters', () => {
    expect(computeHeaders({})).toEqual({});
  });

  it('computes token and json header parameters', () => {
    expect(computeHeaders({
      json: true,
      token: 'Bearer 1234',
    })).toEqual({
      'Authorization': 'Bearer 1234',
      'Content-Type': 'application/json',
    });
  });
});
