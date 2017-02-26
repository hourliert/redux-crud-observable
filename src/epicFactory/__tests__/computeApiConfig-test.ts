import { IApiConfig } from 'observableApiConnector';

import computeApiConfig from '../computeApiConfig';

describe('computeApiConfig', () => {
  const apiConfig: IApiConfig = {
    apiProto: 'https',
    baseUrl: 'api.starwars.galaxy',
    route: '/jedis',
    version: '/v1',
  };

  it('creates a new config', () => {
    const config = computeApiConfig(apiConfig, {
      apiProto: 'https',
      baseUrl: 'api.starwars.galaxy',
      route: '/jedi',
      version: '/v1',
    });

    expect(config).toEqual({
      apiProto: 'https',
      baseUrl: 'api.starwars.galaxy',
      route: '/jedi',
      version: '/v1',
    });
  });
});


