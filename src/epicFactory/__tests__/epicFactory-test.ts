import * as nock from 'nock';
import { ActionsObservable, Epic } from 'redux-observable';
import configureMockStore, { IStore } from 'redux-mock-store';

import { IApiConfig } from 'observableApiConnector';
import { crudActionsCreatorFactory } from 'actionsCreatorFactory';

import epicFactory from '../epicFactory';

describe('epicFactory', () => {
  let mockServer: nock.Scope;
  let store: IStore<any>;
  let rootEpic: Epic<any, any>;

  const entity = 'JEDI';
  const apiConfig: IApiConfig = {
    apiProto: 'https',
    baseUrl: 'api.starwars.galaxy',
    route: '/jedis',
    version: '/v1',
  };

  const {
    cancelReadEntity,
    cancelReadEntitiesList,
    cancelReadBatchEntities,
    cancelCreateEntity,

    requestReadEntity,
    requestReadEntitiesList,
    requestReadBatchEntities,
    requestCreateEntity,
  } = crudActionsCreatorFactory(entity);
  const mockStore = configureMockStore();

  beforeEach(() => {
    mockServer = nock('https://api.starwars.galaxy');
    store = mockStore();
    rootEpic = epicFactory({
      entity,
      apiConfig,
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('Create Epic', () => {
    it('creates a create entity epic', () => {
      const fixture =  {
        id: 5,
        name: 'Yoda',
      };

      mockServer
        .post('/v1/jedis')
        .reply(201, fixture);

      const input$ = ActionsObservable.of(requestCreateEntity({
        body: {
          name: 'Yoda',
        },
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions).toEqual({
                payload: fixture,
                type: 'FINISH_CREATE_JEDI',
              });

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('cancels a create entity epic', () => {
      const input$ = ActionsObservable.from([
        requestCreateEntity({
          body: {
            name: 'Yoda',
          },
        }),
        cancelCreateEntity(),
      ]);


      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((res: boolean) => {
            try {
              expect(res).toBeTruthy();
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('fails to create entity epic', () => {
      mockServer
        .post('/v1/jedis')
        .reply(404);

      const input$ = ActionsObservable.of(requestCreateEntity({
        body: {
          name: 'Yoda',
        },
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions.type).toEqual('FAIL_CREATE_JEDI');
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });
  });

  describe('Read Epic', () => {
    it('creates a read entity epic', () => {
      const fixture =  {
        id: 5,
        name: 'Yoda',
      };

      mockServer
        .get('/v1/jedis/5')
        .reply(200, fixture);

      const input$ = ActionsObservable.of(requestReadEntity({
        id: 5,
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions).toEqual({
                payload: fixture,
                type: 'FINISH_READ_JEDI',
              });

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('cancels a read entity epic', () => {
      const input$ = ActionsObservable.from([
        requestReadEntity({
          id: 5,
        }),
        cancelReadEntity(),
      ]);


      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((res: boolean) => {
            try {
              expect(res).toBeTruthy();
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('fails to read entity epic', () => {
      mockServer
        .get('/v1/jedis/5')
        .reply(404);

      const input$ = ActionsObservable.of(requestReadEntity({
        id: 5,
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions.type).toEqual('FAIL_READ_JEDI');
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('creates a read entities list epic', () => {
      const fixture = {
        member: [
          {
            id: 5,
            name: 'Yoda',
          },
          {
            id: 6,
            name: 'Obi Wan',
          },
        ],
      };

      mockServer
        .get('/v1/jedis')
        .reply(200, fixture);

      const input$ = ActionsObservable.of(requestReadEntitiesList());

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions).toEqual({
                payload: fixture,
                type: 'FINISH_READ_JEDIS_LIST',
              });

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('cancels a read entities list epic', () => {
      const input$ = ActionsObservable.from([
        requestReadEntitiesList(),
        cancelReadEntitiesList(),
      ]);

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((res: boolean) => {
            try {
              expect(res).toBeTruthy();
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('fails to read entity epic', () => {
      mockServer
        .get('/v1/jedis')
        .reply(404);

      const input$ = ActionsObservable.of(requestReadEntitiesList());

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions.type).toEqual('FAIL_READ_JEDIS_LIST');
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('creates a read batch entities epic', () => {
      const fixture = [
        {
          id: 5,
          name: 'Yoda',
        },
        {
          id: 6,
          name: 'Obi Wan',
        },
      ];

      mockServer
        .get('/v1/jedis/5')
        .reply(200, fixture[0])
        .get('/v1/jedis/6')
        .reply(200, fixture[1]);

      const input$ = ActionsObservable.of(requestReadBatchEntities({
        ids: [5, 6],
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions).toEqual({
                payload: fixture,
                type: 'FINISH_READ_BATCH_JEDIS',
              });

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('cancels a read batch entities epic', () => {
      const input$ = ActionsObservable.from([
        requestReadBatchEntities({
          ids: [5, 6],
        }),
        cancelReadBatchEntities(),
      ]);

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((res: boolean) => {
            try {
              expect(res).toBeTruthy();
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('fails to read batch of entities epic', () => {
      mockServer
        .get('/v1/jedis/5')
        .reply(404)
        .get('/v1/jedis/6')
        .reply(404);

      const input$ = ActionsObservable.of(requestReadBatchEntities({
        ids: [5, 6],
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions.type).toEqual('FAIL_READ_BATCH_JEDIS');
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });
  });
});
