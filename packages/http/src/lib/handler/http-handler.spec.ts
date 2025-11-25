import {
    HttpHandlerInterface,
    HttpInterceptorInterface,
    HttpRequestInterface,
    RequestMethod,
}                      from '../contract';
import { HttpRequest } from '../model';
import { HttpHandler } from './http-handler';

describe('HttpHandler', (): void => {

    it('creates and executes interceptor chain.', (): void => {
        let interceptor: HttpInterceptorInterface = {
            intercept: jest.fn(),
        };
        let next: HttpHandlerInterface            = {
            handle: jest.fn(),
        };

        let request: HttpRequestInterface = new HttpRequest('https://foo.bar', RequestMethod.GET);
        let handler: HttpHandlerInterface = new HttpHandler(interceptor, next);

        handler.handle(request);

        expect(interceptor.intercept).toHaveBeenCalledTimes(1);
        expect(interceptor.intercept).toHaveBeenCalledWith(request, next);
    });

});
