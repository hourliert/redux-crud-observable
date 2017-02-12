jest.mock('rxjs/observable/dom/ajax');
jest.mock('../requestFormatters');
jest.mock('../streamFormatters');

import { ajax } from 'rxjs/observable/dom/ajax';
import { formatAjaxStream } from '../streamFormatters';
import { computeHeaders, computeParametrizedUrl } from '../requestFormatters';

import { fetchEntity } from '../observableApiConnector';

describe('observableApiConnector', () => {
  it('fetches an entity', () => {
    fetchEntity({
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        json: false,
        route: '/jedis',
        token: 'Bearer 1234',
        version: '/v1',
      },
      id: 5,
      queryParams: { hasForce: true },
    });

    expect((<jest.Mock<any>>computeHeaders).mock.calls[0][0]).toEqual({
      json: false,
      token: 'Bearer 1234',
    });

    expect((<jest.Mock<any>>computeParametrizedUrl).mock.calls[0][0]).toEqual({
      apiProto: 'https',
      baseUrl: 'api.starwars.galaxy',
      id: 5,
      queryParams: { hasForce: true },
      route: '/jedis',
      version: '/v1',
    });

    expect((<jest.Mock<any>><any>ajax).mock.calls[0][0]).toEqual({
      crossDomain: true,
      headers: undefined,
      method: 'GET',
      responseType: 'json',
      url: undefined,
    });

    expect((<jest.Mock<any>>formatAjaxStream).mock.calls[0][0]).toEqual(undefined);
  });
});
