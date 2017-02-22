import * as nock from 'nock';
import { ActionsObservable } from 'redux-observable';
import configureMockStore, { IStore } from 'redux-mock-store';

import { IApiConfig } from 'observableApiConnector';
import { readCrudActionsCreatorFactory } from 'actionsCreatorFactory';

import epicFactory from '../epicFactory';

describe('epicFactory', () => {
  let mockServer: nock.Scope;
  let store: IStore<any>;

  const entity = 'JEDI';
  const apiConfig: IApiConfig = {
    apiProto: 'https',
    baseUrl: 'api.starwars.galaxy',
    route: '/jedis',
    version: '/v1',
  };

  const {
    requestReadEntity,
  } = readCrudActionsCreatorFactory(entity);
  const mockStore = configureMockStore();

  beforeEach(() => {
    mockServer = nock('https://api.starwars.galaxy');
    store = mockStore();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates a read epic', async () => {
    mockServer
      .get('/v1/jedis/5')
      .reply(200, {
        id: 5,
        name: 'Yoda',
      });

    const readEpic = epicFactory({
      entity,
      apiConfig,
    });

    const input$ = ActionsObservable.of(requestReadEntity({
      id: 5,
    }));

    await new Promise((resolve, reject) => {
      readEpic(input$, store)
        .subscribe((actions: any) => {
          try {
            expect(actions).toEqual({
              payload: { id: 5, name: 'Yoda' },
              type: 'FINISH_READ_JEDI',
            });

            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });
});
