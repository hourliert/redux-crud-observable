import { DELETE, DELETE_BATCH } from '../delete';

describe('DELETE constant factory', () => {
  const ENTITY = 'NINJA';

  it('creates an object containing DELETE constants', () => {
    const constants = DELETE(ENTITY);

    expect(constants).toEqual({
      CANCEL: `CANCEL_DELETE_NINJA`,
      FAIL: `FAIL_DELETE_NINJA`,
      FINISH: `FINISH_DELETE_NINJA`,
      REQUEST: `REQUEST_DELETE_NINJA`,
      value: `DELETE_NINJA`,
    });
  });

  it('creates an object containing DELETE_BATCH constants', () => {
    const constants = DELETE_BATCH(ENTITY);

    expect(constants).toEqual({
      CANCEL: `CANCEL_DELETE_BATCH_NINJAS`,
      FAIL: `FAIL_DELETE_BATCH_NINJAS`,
      FINISH: `FINISH_DELETE_BATCH_NINJAS`,
      REQUEST: `REQUEST_DELETE_BATCH_NINJAS`,
      value: `DELETE_BATCH_NINJAS`,
    });
  });
});
