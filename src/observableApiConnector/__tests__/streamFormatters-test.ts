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

  it('formats an ajax stream without config', () => {
    expect(() => formatAjaxStream(<any>{}))
      .toThrowError('Missing config parameter');
  });

  it('formats an ajax stream without stream$', () => {
    expect(() => formatAjaxStream(<any>{ config: { isList: true } }))
      .toThrowError('Missing stream$ parameter');
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

    const params = {
      config: { isList: false },
      stream$: Observable.of(ajaxResponse),
    };

    const r = await formatAjaxStream(params)
      .toPromise();

    expect(r.id).toEqual('5');
    expect(r.name).toEqual('Yoda');
    expect(r.requestedAt).toBeInstanceOf(Date);
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

    const params = {
      config: { isList: true },
      stream$: Observable.of(ajaxResponse),
    };

    const r = await formatAjaxStream(params)
      .toPromise();

    expect(r.member[0].id).toEqual('5');
    expect(r.member[0].name).toEqual('Yoda');
    expect(r.member[0].requestedAt).toBeInstanceOf(Date);
    expect(r.member[1].id).toEqual('6');
    expect(r.member[1].name).toEqual('Obi Wan');
    expect(r.member[1].requestedAt).toBeInstanceOf(Date);
  });

  it('formats an ajax stream throwing an error', async () => {
    const ajaxError = new AjaxError(
      'Cannot find this jedi',
      new XMLHttpRequest(),
      {},
    );

    const params = {
      config: { isList: false },
      stream$: Observable.throw(ajaxError),
    };

    try {
      await formatAjaxStream(params)
      .toPromise();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toEqual('Cannot find this jedi');
    }
  });
});
