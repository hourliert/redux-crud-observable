import { READ, READ_BATCH, READ_LIST } from '../READ';

describe('READ constant factory', () => {
  const ENTITY = 'NINJA';

  it('creates an object containing READ constants', () => {
    const constants = READ(ENTITY);

    expect(constants).toEqual({
      CANCEL: `CANCEL_READ_NINJA`,
      FAIL: `FAIL_READ_NINJA`,
      FINISH: `FINISH_READ_NINJA`,
      REQUEST: `REQUEST_READ_NINJA`,
      value: `READ_NINJA`,
    });
  });

  it('creates an object containing READ_BATCH constants', () => {
    const constants = READ_BATCH(ENTITY);

    expect(constants).toEqual({
      CANCEL: `CANCEL_READ_BATCH_NINJAS`,
      FAIL: `FAIL_READ_BATCH_NINJAS`,
      FINISH: `FINISH_READ_BATCH_NINJAS`,
      REQUEST: `REQUEST_READ_BATCH_NINJAS`,
      value: `READ_BATCH_NINJAS`,
    });
  });

  it('creates an object containing READ_LIST constants', () => {
    const constants = READ_LIST(ENTITY);

    expect(constants).toEqual({
      CANCEL: `CANCEL_READ_NINJAS_LIST`,
      FAIL: `FAIL_READ_NINJAS_LIST`,
      FINISH: `FINISH_READ_NINJAS_LIST`,
      REQUEST: `REQUEST_READ_NINJAS_LIST`,
      value: `READ_NINJAS_LIST`,
    });
  });
});
