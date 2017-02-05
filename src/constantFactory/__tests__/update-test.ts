import { UPDATE } from '../UPDATE';

describe('UPDATE constant factory', () => {
  const ENTITY = 'NINJA';

  it('creates an object containing UPDATE constants', () => {
    const constants = UPDATE(ENTITY);

    expect(constants).toEqual({
      CANCEL: `CANCEL_UPDATE_NINJA`,
      FAIL: `FAIL_UPDATE_NINJA`,
      FINISH: `FINISH_UPDATE_NINJA`,
      REQUEST: `REQUEST_UPDATE_NINJA`,
      value: `UPDATE_NINJA`,
    });
  });
});
