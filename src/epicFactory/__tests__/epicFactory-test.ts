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
    cancelUpdateEntity,
    cancelDeleteEntity,
    cancelDeleteBatchEntities,

    requestReadEntity,
    requestReadEntitiesList,
    requestReadBatchEntities,
    requestCreateEntity,
    requestUpdateEntity,
    requestDeleteEntity,
    requestDeleteBatchEntities,
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
    it('creates a create entity epic with bad params', () => {
      const input$ = ActionsObservable.of(requestCreateEntity());

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((actions: boolean) => {
            try {
              expect(actions).toBeTruthy();

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('creates a create entity epic', () => {
      const fixture =  {
        id: 5,
        name: 'Yoda',
      };

      mockServer
        .post('/v1/jedis')
        .reply(200, fixture);

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
    it('creates a read entity epic with bad params', () => {
      const input$ = ActionsObservable.of(requestReadEntity());

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((actions: boolean) => {
            try {
              expect(actions).toBeTruthy();

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

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
                payload: {
                  _internalMember: [
                    {
                      id: 5,
                      name: 'Yoda',
                    },
                    {
                      id: 6,
                      name: 'Obi Wan',
                    },
                  ],
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
                },
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

    it('creates a read batch entities epic with bad params', () => {
      const input$ = ActionsObservable.of(requestReadBatchEntities());

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((actions: boolean) => {
            try {
              expect(actions).toBeTruthy();

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

  describe('Update Epic', () => {
    it('creates a update entity epic with bad params', () => {
      const input$ = ActionsObservable.of(requestUpdateEntity());

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((actions: boolean) => {
            try {
              expect(actions).toBeTruthy();

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('creates a update entity epic', () => {
      const fixture =  {
        id: 5,
        name: 'Yoda',
      };

      mockServer
        .put('/v1/jedis/5')
        .reply(200, fixture);

      const input$ = ActionsObservable.of(requestUpdateEntity({
        body: {
          name: 'Yoda',
        },
        id: 5,
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions).toEqual({
                payload: fixture,
                type: 'FINISH_UPDATE_JEDI',
              });

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('cancels a update entity epic', () => {
      const input$ = ActionsObservable.from([
        requestUpdateEntity({
          body: {
            name: 'Yoda',
          },
          id: 5,
        }),
        cancelUpdateEntity(),
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

    it('fails to update entity epic', () => {
      mockServer
        .put('/v1/jedis/5')
        .reply(404);

      const input$ = ActionsObservable.of(requestUpdateEntity({
        body: {
          name: 'Yoda',
        },
        id: 5,
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions.type).toEqual('FAIL_UPDATE_JEDI');
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });
  });

  describe('Delete Epic', () => {
    it('creates a delete entity epic with bad params', () => {
      const input$ = ActionsObservable.of(requestDeleteEntity());

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((actions: boolean) => {
            try {
              expect(actions).toBeTruthy();

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('creates a delete entity epic', () => {
      mockServer
        .delete('/v1/jedis/5')
        .reply(201);

      const input$ = ActionsObservable.of(requestDeleteEntity({
        id: 5,
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions).toEqual({
                payload: 5,
                type: 'FINISH_DELETE_JEDI',
              });

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('cancels a delete entity epic', () => {
      const input$ = ActionsObservable.from([
        requestDeleteEntity({
          id: 5,
        }),
        cancelDeleteEntity(),
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

    it('fails to delete entity epic', () => {
      mockServer
        .delete('/v1/jedis/5')
        .reply(404);

      const input$ = ActionsObservable.of(requestDeleteEntity({
        id: 5,
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions.type).toEqual('FAIL_DELETE_JEDI');
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('creates a delete a batch of entities epic with bad params', () => {
      const input$ = ActionsObservable.of(requestDeleteBatchEntities());

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .isEmpty()
          .subscribe((actions: boolean) => {
            try {
              expect(actions).toBeTruthy();

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('creates a delete batch entities epic', () => {
      mockServer
        .delete('/v1/jedis/5')
        .reply(201)
        .delete('/v1/jedis/6')
        .reply(201);

      const input$ = ActionsObservable.of(requestDeleteBatchEntities({
        ids: [5, 6],
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions).toEqual({
                payload: [5, 6],
                type: 'FINISH_DELETE_BATCH_JEDIS',
              });

              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it('cancels a delete batch entities epic', () => {
      const input$ = ActionsObservable.from([
        requestDeleteBatchEntities({
          ids: [5, 6],
        }),
        cancelDeleteBatchEntities(),
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

    it('fails to delete batch of entities epic', () => {
      mockServer
        .delete('/v1/jedis/5')
        .reply(404)
        .delete('/v1/jedis/6')
        .reply(404);

      const input$ = ActionsObservable.of(requestDeleteBatchEntities({
        ids: [5, 6],
      }));

      return new Promise((resolve, reject) => {
        rootEpic(input$, store)
          .subscribe((actions: any) => {
            try {
              expect(actions.type).toEqual('FAIL_DELETE_BATCH_JEDIS');
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });
  });
});
