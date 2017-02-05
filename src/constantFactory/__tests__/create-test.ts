import { CREATE } from '../create';

describe('CREATE constant factory', () => {
  const ENTITY = 'NINJA';

  it('creates an object containing CREATE constants', () => {
    const constants = CREATE(ENTITY);

    expect(constants).toEqual({
      CANCEL: `CANCEL_CREATE_NINJA`,
      FAIL: `FAIL_CREATE_NINJA`,
      FINISH: `FINISH_CREATE_NINJA`,
      REQUEST: `REQUEST_CREATE_NINJA`,
      value: `CREATE_NINJA`,
    });
  });
});
