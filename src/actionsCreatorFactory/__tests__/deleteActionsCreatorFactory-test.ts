import deleteActionsCreatorFactory from '../deleteActionsCreatorFactory';

describe('deleteActionsCreatorFactory', () => {
  const ENTITY = 'JEDI';

  it('creates actions creators', () => {
    const actionsCreators = deleteActionsCreatorFactory(ENTITY);

    expect(actionsCreators).toBeDefined();
    expect(actionsCreators.cancelDeleteEntity).toBeInstanceOf(Function);
    expect(actionsCreators.failDeleteEntity).toBeInstanceOf(Function);
    expect(actionsCreators.finishDeleteEntity).toBeInstanceOf(Function);
    expect(actionsCreators.requestDeleteEntity).toBeInstanceOf(Function);
  });

  it('creates a cancel delete entity actions creator', () => {
    const { cancelDeleteEntity, cancelDeleteBatchEntities } = deleteActionsCreatorFactory(ENTITY);

    expect(cancelDeleteEntity()).toEqual({
      type: 'CANCEL_DELETE_JEDI',
    });

    expect(cancelDeleteBatchEntities()).toEqual({
      type: 'CANCEL_DELETE_BATCH_JEDIS',
    });
  });

  it('creates a fail delete entity actions creator', () => {
    const { failDeleteEntity, failDeleteBatchEntities } = deleteActionsCreatorFactory(ENTITY);
    const payload = new Error(`Can't create this jedi`);

    expect(failDeleteEntity(payload)).toEqual({
      error: true,
      payload,
      type: 'FAIL_DELETE_JEDI',
    });

    expect(failDeleteBatchEntities(payload)).toEqual({
      error: true,
      payload,
      type: 'FAIL_DELETE_BATCH_JEDIS',
    });
  });

  it('creates a finish delete entity actions creator', () => {
    const { finishDeleteEntity, finishDeleteBatchEntities } = deleteActionsCreatorFactory(ENTITY);
    const payload = {
      hash: '1234',
      name: 'Yoda',
    };

    expect(finishDeleteEntity(payload)).toEqual({
      payload,
      type: 'FINISH_DELETE_JEDI',
    });

    expect(finishDeleteBatchEntities(payload)).toEqual({
      payload,
      type: 'FINISH_DELETE_BATCH_JEDIS',
    });
  });

  it('creates a cancel delete entity actions creator', () => {
    const { requestDeleteEntity, requestDeleteBatchEntities } = deleteActionsCreatorFactory(ENTITY);
    const payload = {
      hash: '1234',
    };

    expect(requestDeleteEntity(payload)).toEqual({
      payload,
      type: 'REQUEST_DELETE_JEDI',
    });

    expect(requestDeleteBatchEntities(payload)).toEqual({
      payload,
      type: 'REQUEST_DELETE_BATCH_JEDIS',
    });
  });
});
