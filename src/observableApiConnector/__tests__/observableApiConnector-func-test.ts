import * as nock from 'nock';

import { fetchEntity } from '../observableApiConnector';

describe('functionnal observableApiConnector', () => {
  let mockServer: nock.Scope;

  beforeAll(() => {
    mockServer = nock('https://api.starwars.galaxy', {
      reqheaders: {
        'Authorization': 'Bearer 1234',
      },
    })
    .get('/v1/jedis/5/?hasForce=true')
    .reply(200, {
      id: 5,
      name: 'Yoda',
    }, {
     'Content-Type': 'application/json',
    });
  });

  afterAll(() => {
    mockServer.restore();
  });

  it('fetches an entity', async () => {
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

      expect(res.id).toEqual(5);
      expect(res.name).toEqual('Yoda');
      expect(res.requestedAt).toBeInstanceOf(Date);
    } catch (e) {
      expect(false).toBeTruthy();
    }
  });

  it('fails to fetch an entity', async () => {
    const stream$ = fetchEntity({
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        json: false,
        route: '/jedis',
        token: 'Bearer 1234',
        version: '/v1',
      },
      id: 4,
      queryParams: { hasForce: true },
    });

    try {
      await stream$.toPromise();

      expect(false).toBeTruthy();
    } catch (e) {
      expect(true).toBeTruthy();
    }
  });
});
