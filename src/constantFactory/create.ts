import { ICrudAction } from './interfaces';

export function CREATE(ENTITY: string): ICrudAction {
  return {
    CANCEL: `CANCEL_CREATE_${ENTITY}`,
    FAIL: `FAIL_CREATE_${ENTITY}`,
    FINISH: `FINISH_CREATE_${ENTITY}`,
    REQUEST: `REQUEST_CREATE_${ENTITY}`,
    value: `CREATE_${ENTITY}`,
  };
}
