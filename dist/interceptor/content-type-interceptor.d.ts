import { Observable } from 'rxjs';
import { HttpHandlerInterface, HttpInterceptorInterface, HttpRequestInterface, HttpResponseInterface } from '../contract';
/**
 * Content type interceptor will analyze content type header and provided
 * body content. If there is a request body and content type is missing,
 * interceptor will try to figure out it and provide correct value.
 */
export declare class ContentTypeInterceptor implements HttpInterceptorInterface {
    /**
     * @inheritdoc
     */
    intercept(request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface>;
}
//# sourceMappingURL=content-type-interceptor.d.ts.map