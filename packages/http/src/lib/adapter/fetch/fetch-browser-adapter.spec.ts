// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock, { FetchMock } from 'jest-fetch-mock';
import { Observable }           from 'rxjs';
import {
    HttpAdapterInterface,
    HttpRequestInterface,
    HttpResponseInterface,
    RequestMethod,
}                               from '../../contract';
import { HttpError }            from '../../error';
import { HttpRequest }          from '../../model';
import { FetchBrowserAdapter }  from './fetch-browser-adapter';
import DoneCallback = jest.DoneCallback;

describe('FetchBrowserAdapter', (): void => {

    beforeEach((): void => {
        fetchMock.doMock();
    });

    it('executes GET request successfully.', (done: DoneCallback): void => {
        let fetch: FetchMock = fetchMock.mockResponseOnce(JSON.stringify({
            foo: 'bar',
        }));

        let request: HttpRequestInterface                              = new HttpRequest('https://foo.bar', RequestMethod.GET);
        let adapter: HttpAdapterInterface                              = new FetchBrowserAdapter(fetch);
        let result: Observable<HttpResponseInterface<{ foo: string }>> = adapter.execute(request, {
            responseType: 'json',
        });

        result.subscribe((response: HttpResponseInterface<{ foo: string }>): void => {
            expect(response.status).toBe(200);
            expect(response.content).resolves.toEqual({
                foo: 'bar',
            });

            done();
        });
    });

    it('throws error on status code 400.', (done: DoneCallback): void => {
        let fetch: FetchMock = fetchMock.mockResponseOnce('Received bad request.', {
            status:     400,
            statusText: 'Bad Request.',
        });

        let request: HttpRequestInterface                              = new HttpRequest('https://foo.bar', RequestMethod.GET);
        let adapter: HttpAdapterInterface                              = new FetchBrowserAdapter(fetch);
        let result: Observable<HttpResponseInterface<{ foo: string }>> = adapter.execute(request, {
            responseType: 'text',
            errorType:    'text',
        });

        result.subscribe({
            next: (): void => {
                done.fail('Should not be called.');
            },

            error: (error: Error): void => {
                expect(error).toBeInstanceOf(HttpError);
                expect((error as HttpError).status).toBe(400);
                expect(error.message).toBe('Bad Request.');
                expect((error as HttpError).content).resolves.toBe('Received bad request.');

                done();
            },
        });
    });

    it('completes observable on abort.', (done: DoneCallback): void => {
        let fetch: FetchMock = fetchMock.mockAbortOnce();

        let request: HttpRequestInterface                              = new HttpRequest('https://foo.bar', RequestMethod.GET);
        let adapter: HttpAdapterInterface                              = new FetchBrowserAdapter(fetch);
        let result: Observable<HttpResponseInterface<{ foo: string }>> = adapter.execute(request);

        result.subscribe({
            next: (): void => {
                done.fail('Should not be called.');
            },

            error: (): void => {
                done.fail('Should not be called.');
            },

            complete: (): void => {
                done();
            },
        });
    });

});
