import { Observable }             from 'rxjs';
import {
    HttpHandlerInterface,
    HttpRequestInterface,
    HttpResponseInterface,
    RequestMethod,
}                                 from '../contract';
import {
    HttpHeaders,
    HttpRequest,
}                                 from '../model';
import { ContentTypeInterceptor } from './content-type-interceptor';

describe('ContentTypeInterceptor', (): void => {

    type ResponseObservable = Observable<HttpResponseInterface<unknown>>;

    let interceptor: ContentTypeInterceptor;
    let handler: HttpHandlerInterface;
    let observable: ResponseObservable = new Observable<HttpResponseInterface<unknown>>();
    let getHandlerInvocationArg        = (index: number = 0): HttpRequestInterface => (handler.handle as jest.Mock).mock.calls[index][0];

    beforeEach((): void => {
        interceptor = new ContentTypeInterceptor();
        handler     = {
            handle: jest.fn((): ResponseObservable => observable),
        };
    });

    it('skips interception when body is "null".', (): void => {
        let request: HttpRequestInterface = new HttpRequest('https://foo.bar', RequestMethod.GET, new HttpHeaders({
            'content-type': 'application/json',
        }), null);

        expect(interceptor.intercept(request, handler)).toBe(observable);
        expect(handler.handle).toHaveBeenCalledTimes(1);
        expect(handler.handle).toHaveBeenCalledWith(request);
    });

    it('skips interception when body is "undefined".', (): void => {
        let request: HttpRequestInterface = new HttpRequest('https://foo.bar', RequestMethod.GET, new HttpHeaders({
            'content-type': 'application/json',
        }), undefined);

        expect(interceptor.intercept(request, handler)).toBe(observable);
        expect(handler.handle).toHaveBeenCalledTimes(1);
        expect(handler.handle).toHaveBeenCalledWith(request);
    });

    it('skips interception when "Content-Type" header is present.', (): void => {
        let request: HttpRequestInterface = new HttpRequest('https://foo.bar', RequestMethod.GET, new HttpHeaders({
            'content-type': 'application/json',
        }), {
            foo: 'bar',
        });

        expect(interceptor.intercept(request, handler)).toBe(observable);
        expect(handler.handle).toHaveBeenCalledTimes(1);
        expect(handler.handle).toHaveBeenCalledWith(request);
    });

    it('sets "Content-Type" to "multipart/form-data" when body is instance of "FormData".', (): void => {
        let request: HttpRequestInterface = new HttpRequest('https://foo.bar', RequestMethod.GET, null, new FormData());

        expect(interceptor.intercept(request, handler)).toBe(observable);
        expect(handler.handle).toHaveBeenCalledTimes(1);
        expect(handler.handle).not.toHaveBeenCalledWith(request);

        expect(getHandlerInvocationArg().headers.get('content-type')).toBe('multipart/form-data');
    });

    it('sets "Content-Type" to "application/json" when body is javascript object.', (): void => {
        let request: HttpRequestInterface = new HttpRequest('https://foo.bar', RequestMethod.GET, null, {
            foo: 'bar',
        });

        expect(interceptor.intercept(request, handler)).toBe(observable);
        expect(handler.handle).toHaveBeenCalledTimes(1);
        expect(handler.handle).not.toHaveBeenCalledWith(request);

        expect(getHandlerInvocationArg().headers.get('content-type')).toBe('application/json');
    });

    it('sets "Content-Type" to "text/plain" when body is string object.', (): void => {
        let request: HttpRequestInterface = new HttpRequest('https://foo.bar', RequestMethod.GET, null, 'foo bar');

        expect(interceptor.intercept(request, handler)).toBe(observable);
        expect(handler.handle).toHaveBeenCalledTimes(1);
        expect(handler.handle).not.toHaveBeenCalledWith(request);

        expect(getHandlerInvocationArg().headers.get('content-type')).toBe('text/plain');
    });

    it.each([
        1,
        true,
        false,
        Symbol('foo'),
    ])('skips interception when content type can not be guessed for body.', (body: unknown): void => {
        let request: HttpRequestInterface = new HttpRequest('https://foo.bar', RequestMethod.GET, null, body);

        expect(interceptor.intercept(request, handler)).toBe(observable);
        expect(handler.handle).toHaveBeenCalledTimes(1);
        expect(handler.handle).toHaveBeenCalledWith(request);
    });

});
