import { Observable } from 'rxjs';
import {
    HttpHandlerInterface,
    HttpInterceptorInterface,
    HttpRequestInterface,
    HttpResponseInterface,
}                     from '../contract';

/**
 * Http handler wraps the interceptor and creates handler/interceptor chain.
 */
export class HttpHandler implements HttpHandlerInterface {

    private readonly _interceptor: HttpInterceptorInterface;

    private readonly _next: HttpHandlerInterface;

    public constructor(interceptor: HttpInterceptorInterface, next: HttpHandlerInterface) {
        this._interceptor = interceptor;
        this._next        = next;
    }

    public handle(request: HttpRequestInterface): Observable<HttpResponseInterface<unknown>> {
        return this._interceptor.intercept(request, this._next);
    }

}
