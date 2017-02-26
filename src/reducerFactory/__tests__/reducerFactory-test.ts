import { Reducer } from 'redux';
import {
  INIT_STORE,
  CREATE,
  READ,
  READ_BATCH,
  READ_LIST,
  UPDATE,
  DELETE,
  DELETE_BATCH,
} from 'constantFactory';

import { CrudState } from '../interfaces';
import crudReducerFactory from '../reducerFactory';

describe('Crud Reducer Factory', () => {
  const ENTITY = 'JEDI';

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
    const yoda = {
      hash: '1234',
      name: 'Yoda',
    };
    const obiWan = {
      hash: '5678',
      name: 'Obi Wan',
    };
    const anakin = {
      hash: '9012',
      name: 'Anakin',
    };
    const jedis = [yoda, obiWan];

    beforeEach(() => {
      reducer = crudReducerFactory(ENTITY, {
        value: {
          9012: anakin,
        },
      });
    });

    describe('STORE', () => {
      it('inits the reducer store', () => {
        const now = new Date();
        const action = {
          payload: { now },
          type: INIT_STORE(ENTITY),
        };
        const state = reducer(<any>undefined, action);

        expect(state.get('bootTime')).toEqual(now);
      });
    });

    describe('CREATE', () => {
      it('creates an entity', () => {
        const action = {
          payload: yoda,
          type: CREATE(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state.getIn(['value', '1234']).toJS()).toEqual(yoda);
      });

      it('creates an entity without a payload', () => {
        const initialState = reducer(<any>undefined, <any>undefined);

        const action = {
          payload: undefined,
          type: CREATE(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state).toEqual(initialState);
      });
    });

    describe('READ', () => {
      it('reads an entity without a payload', () => {
        const initialState = reducer(<any>undefined, <any>undefined);

        const action = {
          payload: undefined,
          type: READ(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state).toEqual(initialState);
      });

      it('reads an entity', () => {
        const action = {
          payload: yoda,
          type: READ(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state.getIn(['value', '1234']).toJS()).toEqual(yoda);
      });

      it('reads a batch of entities without a payload', () => {
        const initialState = reducer(<any>undefined, <any>undefined);

        const action = {
          payload: undefined,
          type: READ_BATCH(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state).toEqual(initialState);
      });

      it('reads a batch of entities', () => {
        const action = {
          payload: jedis,
          type: READ_BATCH(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state.getIn(['value', '1234']).toJS()).toEqual(yoda);
        expect(state.getIn(['value', '5678']).toJS()).toEqual(obiWan);
      });

      it('reads a list of entities without a payload', () => {
        const initialState = reducer(<any>undefined, <any>undefined);

        const action = {
          payload: undefined,
          type: READ_LIST(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state).toEqual(initialState);
      });

      it('reads a list of entities', () => {
        const action = {
          payload: {
            member: jedis,
          },
          type: READ_LIST(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state.getIn(['value', '1234']).toJS()).toEqual(yoda);
        expect(state.getIn(['value', '5678']).toJS()).toEqual(obiWan);
      });
    });

    describe('UPDATE', () => {
      it('updates an entity without a payload', () => {
        const initialState = reducer(<any>undefined, <any>undefined);

        const action = {
          payload: undefined,
          type: UPDATE(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state).toEqual(initialState);
      });

      it('updates an entity', () => {
        const darkVador = {
          hash: '9012',
          name: 'Dark Vador',
        };
        const action = {
          payload: darkVador,
          type: UPDATE(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state.getIn(['value', '9012']).toJS()).toEqual(darkVador);
      });
    });

    describe('DELETE', () => {
      it('deletes an entity without a payload', () => {
        const initialState = reducer(<any>undefined, <any>undefined);

        const action = {
          payload: undefined,
          type: DELETE(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state).toEqual(initialState);
      });

      it('deletes an entity', () => {
        const action = {
          payload: anakin,
          type: DELETE(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state.hasIn(['value', '9012'])).toBeFalsy();
      });

      it('deletes a batch of entities', () => {
        const action = {
          payload: [anakin],
          type: DELETE_BATCH(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state.hasIn(['value', '9012'])).toBeFalsy();
      });

      it('deletes a batch of entities without a payload', () => {
        const initialState = reducer(<any>undefined, <any>undefined);

        const action = {
          payload: undefined,
          type: DELETE_BATCH(ENTITY).FINISH,
        };
        const state = reducer(<any>undefined, action);

        expect(state).toEqual(initialState);
      });
    });
  });
});
