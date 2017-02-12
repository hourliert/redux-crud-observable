import * as nock from 'nock';

import { fetchEntity } from '../observableApiConnector';

describe('functionnal observableApiConnector', () => {
  let mockServer: nock.Scope;

  beforeEach(() => {
    mockServer = nock('https://api.starwars.galaxy', {
      reqheaders: {
        'Authorization': 'Bearer 1234',
      },
    });
  });

  it('fetches an entity', async () => {
    mockServer
      .get('/v1/jedis/5/?hasForce=true')
      .reply(200, {
        id: 5,
        name: 'Yoda',
      });

    const stream$ = fetchEntity({
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

    try {
      const res = await stream$.toPromise();

      expect(res).toEqual({
        id: 5,
        name: 'Yoda',
      });
    } catch (e) {
      throw e;
    }
  });

  it('fails to fetch an entity', async () => {
    mockServer
      .get('/v1/jedis/5/?hasForce=true')
      .reply(200, {
        id: 5,
        name: 'Yoda',
      });

    const stream$ = fetchEntity({
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        json: false,
        route: '/jedis',
        token: 'Bearer 1234',
        version: '/v1',
      },
      id: 3,
      queryParams: { hasForce: true },
    });

    try {
      await stream$.toPromise();

      throw new Error(`The request has reached the mock server and shouldn't have`);
    } catch (e) {
      expect(true).toBeTruthy();
    }
  });

  it('fetches a list of entities', async () => {
    mockServer
      .get('/v1/jedis')
      .reply(200, {
        member: [
          {
            id: 5,
            name: 'Yoda',
          },
          {
            id: 42,
            name: 'Obi Wan',
          },
        ],
      });

    const stream$ = fetchEntity({
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        json: false,
        route: '/jedis',
        token: 'Bearer 1234',
        version: '/v1',
      },
    });

    try {
      const res = await stream$.toPromise();

      expect(res).toEqual({
        member: [
          {
            id: 5,
            name: 'Yoda',
          },
          {
            id: 42,
            name: 'Obi Wan',
          },
        ],
      });
    } catch (e) {
      throw e;
    }
  });
});
