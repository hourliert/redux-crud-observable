import { ICrudAction } from './interfaces';

export function READ(ENTITY: string): ICrudAction {
  return {
    CANCEL: `CANCEL_READ_${ENTITY}`,
    FAIL: `FAIL_READ_${ENTITY}`,
    FINISH: `FINISH_READ_${ENTITY}`,
    REQUEST: `REQUEST_READ_${ENTITY}`,
    value: `READ_${ENTITY}`,
  };
}

export function READ_BATCH(ENTITY: string): ICrudAction {
  return {
    CANCEL: `CANCEL_READ_BATCH_${ENTITY}S`,
    FAIL: `FAIL_READ_BATCH_${ENTITY}S`,
    FINISH: `FINISH_READ_BATCH_${ENTITY}S`,
    REQUEST: `REQUEST_READ_BATCH_${ENTITY}S`,
    value: `READ_BATCH_${ENTITY}S`,
  };
}

export function READ_LIST(ENTITY: string): ICrudAction {
  return {
    CANCEL: `CANCEL_READ_${ENTITY}S_LIST`,
    FAIL: `FAIL_READ_${ENTITY}S_LIST`,
    FINISH: `FINISH_READ_${ENTITY}S_LIST`,
    REQUEST: `REQUEST_READ_${ENTITY}S_LIST`,
    value: `READ_${ENTITY}S_LIST`,
  };
}
