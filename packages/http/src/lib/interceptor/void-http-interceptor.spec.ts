import { Observable }          from 'rxjs';
import {
    HttpHandlerInterface,
    HttpRequestInterface,
    HttpResponseInterface,
    RequestMethod,
}                              from '../contract';
import { HttpRequest }         from '../model';
import { VoidHttpInterceptor } from './void-http-interceptor';

describe('VoidHttpInterceptor', (): void => {

    it('passes request to next handler.', (): void => {
        type ObservableResponse = Observable<HttpResponseInterface<unknown>>;

        let interceptor: VoidHttpInterceptor = new VoidHttpInterceptor();
        let request: HttpRequestInterface    = new HttpRequest('https://foo.bar', RequestMethod.GET);
        let observable: ObservableResponse = new Observable();
        let next: HttpHandlerInterface       = {
            handle: jest.fn((): ObservableResponse => observable),
        };

        expect(interceptor.intercept(request, next)).toBe(observable);
        expect(next.handle).toBeCalledTimes(1);
    });

});
