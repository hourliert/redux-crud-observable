import crudReducerFactory from '../reducerFactory';

describe('Reducer Factory', () => {
  const ENTITY = 'NINJA';

  it('creates a crud reducer', () => {
    const reducer = crudReducerFactory(ENTITY);

    expect(reducer).toBeDefined();
  });
});


