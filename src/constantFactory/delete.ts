import { ICrudAction } from './interfaces';

export function DELETE(ENTITY: string): ICrudAction {
  return {
    CANCEL: `CANCEL_DELETE_${ENTITY}`,
    FAIL: `FAIL_DELETE_${ENTITY}`,
    FINISH: `FINISH_DELETE_${ENTITY}`,
    REQUEST: `REQUEST_DELETE_${ENTITY}`,
    value: `DELETE_${ENTITY}`,
  };
}

export function DELETE_BATCH(ENTITY: string): ICrudAction {
  return {
    CANCEL: `CANCEL_DELETE_BATCH_${ENTITY}S`,
    FAIL: `FAIL_DELETE_BATCH_${ENTITY}S`,
    FINISH: `FINISH_DELETE_BATCH_${ENTITY}S`,
    REQUEST: `REQUEST_DELETE_BATCH_${ENTITY}S`,
    value: `DELETE_BATCH_${ENTITY}S`,
  };
}
