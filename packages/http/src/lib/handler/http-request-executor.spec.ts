import { Observable }          from 'rxjs';
import {
    HttpRequestInterface,
    HttpResponseInterface,
    RequestMethod,
}                              from '../contract';
import { HttpRequest }         from '../model';
import { HttpRequestExecutor } from './http-request-executor';

describe('HttpRequestExecutor', (): void => {

    it('executes request and yields observable.', (): void => {
        type ObservableResponse = Observable<HttpResponseInterface<unknown>>;

        let observable: ObservableResponse                                        = new Observable();
        let executorMockFn: (request: HttpRequestInterface) => ObservableResponse = jest.fn((): ObservableResponse => observable);
        let requestExecutor: HttpRequestExecutor                                  = new HttpRequestExecutor(executorMockFn);
        let request: HttpRequestInterface                                         = new HttpRequest('https://foo.bar', RequestMethod.GET);

        expect(requestExecutor.handle(request)).toBe(observable);
        expect(executorMockFn).toBeCalledTimes(1);
    });

});
