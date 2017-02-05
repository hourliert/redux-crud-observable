import { Reducer } from 'redux';
import {
  INIT_STORE,
  READ,
  READ_BATCH,
} from 'constantFactory';

import { CrudState } from '../interfaces';
import crudReducerFactory from '../reducerFactory';

describe('Crud Reducer Factory', () => {
  const ENTITY = 'NINJA';

  it('throws an error if the factory has invalid arguments', () => {
    expect(() => crudReducerFactory(<any>undefined))
      .toThrowError('ENTITY is missing');
  });

  it('creates a crud reducer', () => {
    const reducer = crudReducerFactory(ENTITY);

    expect(reducer).toBeDefined();
  });

  it('upgrades the initial reducer state', () => {
    const initialState = {
      myPadawan: 'Anakin',
    };

    const reducer = crudReducerFactory(ENTITY, initialState);
    const state = reducer(<any>undefined, <any>undefined);

    expect(state.get('value').toJS()).toEqual({});
    expect(state.get('myPadawan')).toEqual('Anakin');
  });

  it('upgrades the reducer reducers', () => {
    const actionType = 'ACTION_TYPE';
    const actionPayload = 5;
    const reducersMap = {
      [actionType]: (state: any, action: any) => state.setIn(['value'], action.payload),
    };

    const reducer = crudReducerFactory(ENTITY, undefined, reducersMap);

    const state = reducer(<any>undefined, {
      payload: actionPayload,
      type: actionType,
    });

    expect(state.get('value')).toEqual(actionPayload);
  });

  describe('with a CRUD reducer', () => {
    let reducer: Reducer<CrudState>;

    beforeEach(() => {
      reducer = crudReducerFactory(ENTITY);
    });

    it('inits the reducer store', () => {
      const now = new Date();
      const action = {
        payload: { now },
        type: INIT_STORE(ENTITY),
      };

      const state = reducer(<any>undefined, action);

      expect(state.get('bootTime')).toEqual(now);
    });

    it('reads an entity', () => {
      const action = {
        payload: {
          hash: '1234',
          name: 'Yoda',
        },
        type: READ(ENTITY).FINISH,
      };

      const state = reducer(<any>undefined, action);

      expect(state.get('value').toJS()).toEqual({
        1234: {
          hash: '1234',
          name: 'Yoda',
        },
      });
    });

    it('reads a batch of entities', () => {
      const action = {
        payload: [
          {
            hash: '1234',
            name: 'Yoda',
          },
          {
            hash: '5678',
            name: 'Obi Wan',
          },
        ],
        type: READ_BATCH(ENTITY).FINISH,
      };

      const state = reducer(<any>undefined, action);

      expect(state.get('value').toJS()).toEqual({
        1234: {
          hash: '1234',
          name: 'Yoda',
        },
        5678: {
          hash: '5678',
          name: 'Obi Wan',
        },
      });
    });
  });
});


