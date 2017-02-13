import createActionsCreatorFactory from '../createActionsCreatorFactory';

describe('createActionsCreatorFactory', () => {
  const ENTITY = 'JEDI';

  it('creates actions creators', () => {
    const actionsCreators = createActionsCreatorFactory(ENTITY);

    expect(actionsCreators).toBeDefined();
    expect(actionsCreators.cancelCreateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.failCreateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.finishCreateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.requestCreateEntity).toBeInstanceOf(Function);
  });

  it('creates a cancel create entity actions creator', () => {
    const { cancelCreateEntity } = createActionsCreatorFactory(ENTITY);

    expect(cancelCreateEntity()).toEqual({
      type: 'CANCEL_CREATE_JEDI',
    });
  });

  it('creates a fail create entity actions creator', () => {
    const { failCreateEntity } = createActionsCreatorFactory(ENTITY);
    const payload = new Error(`Can't create this jedi`);

    expect(failCreateEntity(payload)).toEqual({
      error: true,
      payload,
      type: 'FAIL_CREATE_JEDI',
    });
  });

  it('creates a finish create entity actions creator', () => {
    const { finishCreateEntity } = createActionsCreatorFactory(ENTITY);
    const payload = {
      hash: '1234',
      name: 'Yoda',
    };

    expect(finishCreateEntity(payload)).toEqual({
      payload,
      type: 'FINISH_CREATE_JEDI',
    });
  });

  it('creates a cancel create entity actions creator', () => {
    const { requestCreateEntity } = createActionsCreatorFactory(ENTITY);
    const payload = {
      hash: '1234',
    };

    expect(requestCreateEntity(payload)).toEqual({
      payload,
      type: 'REQUEST_CREATE_JEDI',
    });
  });
});
