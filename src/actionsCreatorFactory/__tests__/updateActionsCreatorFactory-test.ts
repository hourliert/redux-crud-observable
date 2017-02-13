import updateActionsCreatorFactory from '../updateActionsCreatorFactory';

describe('updateActionsCreatorFactory', () => {
  const ENTITY = 'JEDI';

  it('creates actions creators', () => {
    const actionsCreators = updateActionsCreatorFactory(ENTITY);

    expect(actionsCreators).toBeDefined();
    expect(actionsCreators.cancelUpdateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.failUpdateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.finishUpdateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.requestUpdateEntity).toBeInstanceOf(Function);
  });

  it('creates a cancel update entity actions creator', () => {
    const { cancelUpdateEntity } = updateActionsCreatorFactory(ENTITY);

    expect(cancelUpdateEntity()).toEqual({
      type: 'CANCEL_UPDATE_JEDI',
    });
  });

  it('creates a fail update entity actions creator', () => {
    const { failUpdateEntity } = updateActionsCreatorFactory(ENTITY);
    const payload = new Error(`Can't create this jedi`);

    expect(failUpdateEntity(payload)).toEqual({
      error: true,
      payload,
      type: 'FAIL_UPDATE_JEDI',
    });
  });

  it('creates a finish update entity actions creator', () => {
    const { finishUpdateEntity } = updateActionsCreatorFactory(ENTITY);
    const payload = {
      hash: '1234',
      name: 'Yoda',
    };

    expect(finishUpdateEntity(payload)).toEqual({
      payload,
      type: 'FINISH_UPDATE_JEDI',
    });
  });

  it('creates a cancel update entity actions creator', () => {
    const { requestUpdateEntity } = updateActionsCreatorFactory(ENTITY);
    const payload = {
      hash: '1234',
    };

    expect(requestUpdateEntity(payload)).toEqual({
      payload,
      type: 'REQUEST_UPDATE_JEDI',
    });
  });
});
