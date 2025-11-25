import { Observable } from 'rxjs';
import {
    HttpHandlerInterface,
    HttpInterceptorInterface,
    HttpRequestInterface,
    HttpResponseInterface,
}                     from '../contract';

/**
 * Content type interceptor will analyze content type header and provided
 * body content. If there is a request body and content type is missing,
 * interceptor will try to figure out it and provide correct value.
 */
export class ContentTypeInterceptor implements HttpInterceptorInterface {

    /**
     * {@inheritdoc}
     */
    public intercept(request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface<unknown>> {
        // there is no content body provided, skip guessing...
        if (null === request.body || undefined === request.body) {
            return next.handle(request);
        }

        let contentType: string | null = request.headers.get('content-type');

        // there is a content type, nothing to guess...
        if (null !== contentType) {
            return next.handle(request);
        }

        if (request.body instanceof FormData) {
            return next.handle(request.clone({
                headers: request.headers.append('Content-Type', 'multipart/form-data'),
            }));
        }

        if ('object' === typeof request.body) {
            return next.handle(request.clone({
                headers: request.headers.append('Content-Type', 'application/json'),
            }));
        }

        if ('string' === typeof request.body) {
            return next.handle(request.clone({
                headers: request.headers.append('Content-Type', 'text/plain'),
            }));
        }

        // unable to guess, just pass it along.
        return next.handle(request);
    }

}
