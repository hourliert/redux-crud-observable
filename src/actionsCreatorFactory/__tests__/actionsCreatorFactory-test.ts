import actionsCreatorFactory from '../actionsCreatorFactory';

describe('actionsCreatorFactory', () => {
  const ENTITY = 'JEDI';

  it('imports all actions creators', () => {
    const actionsCreators = actionsCreatorFactory(ENTITY);

    expect(actionsCreators).toBeDefined();
    expect(actionsCreators.cancelUpdateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.failUpdateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.finishUpdateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.requestUpdateEntity).toBeInstanceOf(Function);

    expect(actionsCreators.cancelCreateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.failCreateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.finishCreateEntity).toBeInstanceOf(Function);
    expect(actionsCreators.requestCreateEntity).toBeInstanceOf(Function);

    expect(actionsCreators.cancelDeleteEntity).toBeInstanceOf(Function);
    expect(actionsCreators.failDeleteEntity).toBeInstanceOf(Function);
    expect(actionsCreators.finishDeleteEntity).toBeInstanceOf(Function);
    expect(actionsCreators.requestDeleteEntity).toBeInstanceOf(Function);

    expect(actionsCreators.cancelDeleteBatchEntities).toBeInstanceOf(Function);
    expect(actionsCreators.failDeleteBatchEntities).toBeInstanceOf(Function);
    expect(actionsCreators.finishDeleteBatchEntities).toBeInstanceOf(Function);
    expect(actionsCreators.requestDeleteBatchEntities).toBeInstanceOf(Function);

    expect(actionsCreators.cancelReadEntity).toBeInstanceOf(Function);
    expect(actionsCreators.failReadEntity).toBeInstanceOf(Function);
    expect(actionsCreators.finishReadEntity).toBeInstanceOf(Function);
    expect(actionsCreators.requestReadEntity).toBeInstanceOf(Function);

    expect(actionsCreators.cancelReadEntitiesList).toBeInstanceOf(Function);
    expect(actionsCreators.failReadEntitiesList).toBeInstanceOf(Function);
    expect(actionsCreators.finishReadEntitiesList).toBeInstanceOf(Function);
    expect(actionsCreators.requestReadEntitiesList).toBeInstanceOf(Function);

    expect(actionsCreators.cancelReadBatchEntities).toBeInstanceOf(Function);
    expect(actionsCreators.failReadBatchEntities).toBeInstanceOf(Function);
    expect(actionsCreators.finishReadBatchEntities).toBeInstanceOf(Function);
    expect(actionsCreators.requestReadBatchEntities).toBeInstanceOf(Function);
  });
});
