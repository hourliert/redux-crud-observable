import * as nock from 'nock';

import { fetchEntity } from '../observableApiConnector';

describe('functionnal observableApiConnector', () => {
  let mockServer: nock.Scope;

  beforeEach(() => {
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

  afterEach(() => {
    nock.restore();
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
    } catch (e) {
      throw new Error(`The request hasn't reached the mock server`);
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
});
