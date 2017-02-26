import * as nock from 'nock';

import {
  readEntity,
  deleteEntity,
  createEntity,
  updateEntity,
} from '../observableApiConnector';

describe('functionnal observableApiConnector', () => {
  let mockServer: nock.Scope;

  beforeEach(() => {
    mockServer = nock('https://api.starwars.galaxy', {
      reqheaders: {
        'Authorization': 'Bearer 1234',
      },
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('reads an entity', async () => {
    mockServer
      .get('/v1/jedis/5/?hasForce=true')
      .reply(200, {
        id: 5,
        name: 'Yoda',
      });

    const stream$ = readEntity({
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

  it('reads a list of entities', async () => {
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

    const stream$ = readEntity({
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

  it('deletes an entity', async () => {
    mockServer
      .delete('/v1/jedis/5')
      .reply(204);

    const stream$ = deleteEntity({
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        json: false,
        route: '/jedis',
        token: 'Bearer 1234',
        version: '/v1',
      },
      id: 5,
    });

    try {
      const res = await stream$.toPromise();

      expect(res).toEqual('');
    } catch (e) {
      throw e;
    }
  });

  it('updates an entity', async () => {
    mockServer
      .put('/v1/jedis/5')
      .reply(200, {
        id: 5,
        name: 'Obi Wan',
      });

    const stream$ = updateEntity({
      body: {
        name: 'Obi Wan',
      },
      config: {
        apiProto: 'https',
        baseUrl: 'api.starwars.galaxy',
        json: false,
        route: '/jedis',
        token: 'Bearer 1234',
        version: '/v1',
      },
      id: 5,
    });

    try {
      const res = await stream$.toPromise();

      expect(res).toEqual({
        id: 5,
        name: 'Obi Wan',
      });
    } catch (e) {
      throw e;
    }
  });

  it('creates an entity', async () => {
    mockServer
      .post('/v1/jedis')
      .reply(201, {
        id: 5,
        name: 'Obi Wan',
      });

    const stream$ = createEntity({
      body: {
        name: 'Obi Wan',
      },
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
        id: 5,
        name: 'Obi Wan',
      });
    } catch (e) {
      throw e;
    }
  });
});
