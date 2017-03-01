import { Observable } from 'rxjs';
import { createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import * as nock from 'nock';

import { CrudState } from 'reducerFactory';

import * as reduxCrudObservable from '../index';

function toObservable(store: Store<any>): Observable<any> {
  return new Observable((obs: any) => {
    store.subscribe(() => obs.next(store.getState()));
  });
}

function firstTwoStates(store: Store<any>, expectations: (states: any[]) => void): Promise<any> {
  return new Promise((resolve, reject) => {
    toObservable(store)
      .bufferCount(2)
      .subscribe((states: any[]) => {
        try {
          expectations(states);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
  });
}

describe('redux-crud-observable', () => {
  const ENTITY = 'JEDI';
  const rootEpic = reduxCrudObservable.crudEpicFactory({
    apiConfig: {
      apiProto: 'https',
      baseUrl: 'api.starwars.galaxy',
      json: false,
      route: '/jedis',
      token: 'Bearer 1234',
      version: '/v1',
    },
    entity: ENTITY,
  });
  let store: Store<CrudState>;
  let mockServer: nock.Scope;

  const {
    requestReadEntity,
    cancelReadEntity,
  } = reduxCrudObservable.crudActionsCreatorFactory(ENTITY);

  beforeEach(() => {
    const rootReducer = reduxCrudObservable.crudReducerFactory(ENTITY);
    store = createStore(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)));
    mockServer = nock('https://api.starwars.galaxy', {
      reqheaders: {
        'Authorization': 'Bearer 1234',
      },
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('reads an entity and store it into the crud reducer', () => {
    mockServer
      .get('/v1/jedis/5')
      .reply(200, {
        hash: 5,
        name: 'Yoda',
      });

    const p = firstTwoStates(store, (states) => {
      expect(states[0].get('value').toJS()).toEqual({});
      expect(states[1].get('value').toJS()).toEqual({
        5: { hash: 5, name: 'Yoda' },
      });
    });

    store.dispatch(requestReadEntity({
      id: 5,
    }));

    return p;
  });

  it('fails to read an entity and store it into the crud reducer', () => {
    mockServer
      .get('/v1/jedis/5')
      .reply(404);

    const p = firstTwoStates(store, (states) => {
      expect(states[0].get('value').toJS()).toEqual({});
      expect(states[1].get('value').toJS()).toEqual({});
    });

    store.dispatch(requestReadEntity({
      id: 5,
    }));

    return p;
  });

  it('cancels reading an entity and store it into the crud reducer', () => {
    mockServer
      .get('/v1/jedis/5')
      .delay(100)
      .reply(200, {
        hash: 5,
        name: 'Yoda',
      });

    const p = firstTwoStates(store, (states) => {
      expect(states[0].get('value').toJS()).toEqual({});
      expect(states[1].get('value').toJS()).toEqual({});
    });

    store.dispatch(requestReadEntity({
      id: 5,
    }));
    store.dispatch(cancelReadEntity());

    return p;
  });
});
