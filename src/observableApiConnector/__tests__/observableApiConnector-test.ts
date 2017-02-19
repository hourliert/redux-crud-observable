jest.mock('rxjs/observable/dom/ajax');
jest.mock('../requestFormatters');
jest.mock('../streamFormatters');

import { ajax } from 'rxjs/observable/dom/ajax';
import { formatAjaxStream } from '../streamFormatters';
import { computeHeaders, computeParametrizedUrl } from '../requestFormatters';

import {
  createAjaxStream,
  readEntity,
  deleteEntity,
  updateEntity,
  createEntity,
} from '../observableApiConnector';

describe('observableApiConnector', () => {
  it('creates an ajax stream an entity', () => {
    createAjaxStream({
      body: { master: true },
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        json: false,
        route: '/jedis',
        token: 'Bearer 1234',
        version: '/v1',
      },
      id: 5,
      method: 'RANDOM',
      queryParams: { hasForce: true },
      responseType: 'json',
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
      body: { master: true },
      crossDomain: true,
      method: 'RANDOM',
      responseType: 'json',
    });

    expect((<jest.Mock<any>>formatAjaxStream).mock.calls[0][0]).toEqual(undefined);
  });

  it('fetchs an entity', () => {
    readEntity({
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        route: '/jedis',
        version: '/v1',
      },
    });

    expect((<jest.Mock<any>><any>ajax).mock.calls[1][0]).toEqual({
      crossDomain: true,
      method: 'GET',
      responseType: 'json',
    });
  });

  it('deletes a list of entities', () => {
    deleteEntity({
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        route: '/jedis',
        version: '/v1',
      },
    });

    expect((<jest.Mock<any>><any>ajax).mock.calls[2][0]).toEqual({
      crossDomain: true,
      method: 'DELETE',
    });
  });

  it('updates an entity', () => {
    updateEntity({
      body: { master: true },
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        route: '/jedis',
        version: '/v1',
      },
    });

    expect((<jest.Mock<any>><any>ajax).mock.calls[3][0]).toEqual({
      body: { master: true },
      crossDomain: true,
      method: 'PUT',
      responseType: 'json',
    });
  });

  it('creates an entity', () => {
    createEntity({
      body: { master: true },
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        route: '/jedis',
        version: '/v1',
      },

    });

    expect((<jest.Mock<any>><any>ajax).mock.calls[4][0]).toEqual({
      body: { master: true },
      crossDomain: true,
      method: 'POST',
      responseType: 'json',
    });
  });
});
