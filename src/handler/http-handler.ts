import { Observable } from 'rxjs';
import {
    HttpHandlerInterface,
    HttpInterceptorInterface,
    HttpRequestInterface,
    HttpResponseInterface,
}                     from '../contract';

export class HttpHandler implements HttpHandlerInterface {

    private readonly interceptor: HttpInterceptorInterface;

    private readonly next: HttpHandlerInterface;

    public constructor(interceptor: HttpInterceptorInterface, next: HttpHandlerInterface) {
        this.interceptor = interceptor;
        this.next        = next;
    }

    public handle(request: HttpRequestInterface): Observable<HttpResponseInterface> {
        return this.interceptor.intercept(request, this.next);
    }

}
