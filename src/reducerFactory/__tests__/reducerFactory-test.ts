import crudReducerFactory from '../reducerFactory';

describe('Crud Reducer Factory', () => {
  const ENTITY = 'NINJA';

  it('creates a crud reducer', () => {
    const reducer = crudReducerFactory(ENTITY);

    expect(reducer).toBeDefined();
  });

  it.skip('allows to improve initial reducer state', () => {
    const initialState = {
      myKey: 'padawan',
    };

    const reducer = crudReducerFactory(ENTITY, initialState);
    console.log(reducer().toJS());

    expect(reducer(ENTITY)).toEqual({
      myKey: 'padawan',
    });
  });

  describe('with a CRUD reducer', () => {
    let reducer;

    beforeEach(() => {
      reducer = crudReducerFactory(ENTITY);
    });
  });
});


