import { Observable } from 'rxjs';
import { HttpHandlerInterface, HttpInterceptorInterface, HttpRequestInterface, HttpResponseInterface } from '../contract';
/**
 * Default void implementation, allowing us to use interceptors at all.
 *
 * It does not modifies anything, just passes result down to next handler.
 */
export declare class VoidHttpInterceptor implements HttpInterceptorInterface {
    /**
     * @inheritdoc
     */
    intercept(request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface>;
}
//# sourceMappingURL=void-http-interceptor.d.ts.map