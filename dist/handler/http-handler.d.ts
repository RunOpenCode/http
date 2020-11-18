import { Observable } from 'rxjs';
import { HttpHandlerInterface, HttpInterceptorInterface, HttpRequestInterface, HttpResponseInterface } from '../contract';
export declare class HttpHandler implements HttpHandlerInterface {
    private readonly interceptor;
    private readonly next;
    constructor(interceptor: HttpInterceptorInterface, next: HttpHandlerInterface);
    handle(request: HttpRequestInterface): Observable<HttpResponseInterface>;
}
//# sourceMappingURL=http-handler.d.ts.map