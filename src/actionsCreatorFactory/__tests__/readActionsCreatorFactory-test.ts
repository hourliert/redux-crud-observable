import readActionsCreatorFactory from '../readActionsCreatorFactory';

describe('readActionsCreatorFactory', () => {
  const ENTITY = 'JEDI';

  it('creates actions creators', () => {
    const actionsCreators = readActionsCreatorFactory(ENTITY);

    expect(actionsCreators).toBeDefined();
    expect(actionsCreators.cancelReadEntity).toBeInstanceOf(Function);
    expect(actionsCreators.failReadEntity).toBeInstanceOf(Function);
    expect(actionsCreators.finishReadEntity).toBeInstanceOf(Function);
    expect(actionsCreators.requestReadEntity).toBeInstanceOf(Function);
  });

  it('creates a cancel read entity actions creator', () => {
    const { cancelReadEntity, cancelReadEntitiesList, cancelReadBatchEntities } = readActionsCreatorFactory(ENTITY);

    expect(cancelReadEntity()).toEqual({
      type: 'CANCEL_READ_JEDI',
    });

    expect(cancelReadEntitiesList()).toEqual({
      type: 'CANCEL_READ_JEDIS_LIST',
    });

    expect(cancelReadBatchEntities()).toEqual({
      type: 'CANCEL_READ_BATCH_JEDIS',
    });
  });

  it('creates a fail read entity actions creator', () => {
    const { failReadEntity, failReadEntitiesList, failReadBatchEntities } = readActionsCreatorFactory(ENTITY);
    const payload = new Error(`Can't create this jedi`);

    expect(failReadEntity(payload)).toEqual({
      error: true,
      payload,
      type: 'FAIL_READ_JEDI',
    });

    expect(failReadEntitiesList(payload)).toEqual({
      error: true,
      payload,
      type: 'FAIL_READ_JEDIS_LIST',
    });

    expect(failReadBatchEntities(payload)).toEqual({
      error: true,
      payload,
      type: 'FAIL_READ_BATCH_JEDIS',
    });
  });

  it('creates a finish read entity actions creator', () => {
    const { finishReadEntity, finishReadEntitiesList, finishReadBatchEntities } = readActionsCreatorFactory(ENTITY);
    const payload = {
      hash: '1234',
      name: 'Yoda',
    };

    expect(finishReadEntity(payload)).toEqual({
      payload,
      type: 'FINISH_READ_JEDI',
    });

    expect(finishReadEntitiesList(payload)).toEqual({
      payload,
      type: 'FINISH_READ_JEDIS_LIST',
    });

    expect(finishReadBatchEntities(payload)).toEqual({
      payload,
      type: 'FINISH_READ_BATCH_JEDIS',
    });
  });

  it('creates a cancel read entity actions creator', () => {
    const { requestReadEntity, requestReadEntitiesList, requestReadBatchEntities } = readActionsCreatorFactory(ENTITY);
    const payload = {
      hash: '1234',
    };

    expect(requestReadEntity(payload)).toEqual({
      payload,
      type: 'REQUEST_READ_JEDI',
    });

    expect(requestReadEntitiesList(payload)).toEqual({
      payload,
      type: 'REQUEST_READ_JEDIS_LIST',
    });

    expect(requestReadBatchEntities(payload)).toEqual({
      payload,
      type: 'REQUEST_READ_BATCH_JEDIS',
    });
  });
});
