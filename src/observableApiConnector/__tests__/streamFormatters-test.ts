import { Observable, AjaxResponse, AjaxError } from 'rxjs';

import { formatResponse, formatError, formatAjaxStream } from '../streamFormatters';

describe('streamFormatters', () => {
  it('formats a ajax response', () => {
    const ajaxResponse = new AjaxResponse(
      new Event('ajaxResponse'),
      new XMLHttpRequest(),
      {},
    );

    ajaxResponse.response = 'OK';

    expect(formatResponse(ajaxResponse)).toEqual('OK');
  });

  it('formats a ajax error', () => {
    const ajaxError = new AjaxError(
      'Cannot find this jedi',
      new XMLHttpRequest(),
      {},
    );

    const apiError = formatError(ajaxError);

    expect(apiError).toBeInstanceOf(Error);
    expect(apiError.message).toEqual('Cannot find this jedi');
  });

  it('formats an ajax stream of one value', async () => {
    const ajaxResponse = new AjaxResponse(
      new Event('ajaxResponse'),
      new XMLHttpRequest(),
      {},
    );
    ajaxResponse.response = {
      id: '5',
      name: 'Yoda',
    };

    const r = await formatAjaxStream(Observable.of(ajaxResponse))
      .toPromise();

    expect(r.id).toEqual('5');
    expect(r.name).toEqual('Yoda');
  });

  it('formats an ajax stream of a list', async () => {
    const ajaxResponse = new AjaxResponse(
      new Event('ajaxResponse'),
      new XMLHttpRequest(),
      {},
    );
    ajaxResponse.response = {
      member: [
        {
          id: '5',
          name: 'Yoda',
        },
        {
          id: '6',
          name: 'Obi Wan',
        },
      ],
    };

    const r = await formatAjaxStream(Observable.of(ajaxResponse))
      .toPromise();

    expect(r.member[0].id).toEqual('5');
    expect(r.member[0].name).toEqual('Yoda');
    expect(r.member[1].id).toEqual('6');
    expect(r.member[1].name).toEqual('Obi Wan');
  });

  it('formats an ajax stream throwing an error', async () => {
    const ajaxError = new AjaxError(
      'Cannot find this jedi',
      new XMLHttpRequest(),
      {},
    );

    try {
      await formatAjaxStream(Observable.throw(ajaxError))
      .toPromise();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toEqual('Cannot find this jedi');
    }
  });
});
