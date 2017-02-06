import { ICrudAction } from './interfaces';

export function UPDATE(ENTITY: string): ICrudAction {
  return {
    CANCEL: `CANCEL_UPDATE_${ENTITY}`,
    FAIL: `FAIL_UPDATE_${ENTITY}`,
    FINISH: `FINISH_UPDATE_${ENTITY}`,
    REQUEST: `REQUEST_UPDATE_${ENTITY}`,
    value: `UPDATE_${ENTITY}`,
  };
}
