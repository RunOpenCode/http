import { Observable } from 'rxjs';
import {
    HttpHandlerInterface,
    HttpInterceptorInterface,
    HttpRequestInterface,
    HttpResponseInterface,
}                     from '../contract';

/**
 * Default void implementation, allowing us to use interceptors at all.
 *
 * It does not modifies anything, just passes result down to next handler.
 */
export class VoidHttpInterceptor implements HttpInterceptorInterface {

    /**
     * @inheritdoc
     */
    public intercept(request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface<any>> {
        return next.handle(request);
    }

}
