import { HttpRequest } from '../model';
/**
 * Content type interceptor will analyze content type header and provided
 * body content. If there is a request body and content type is missing,
 * interceptor will try to figure out it and provide correct value.
 */
export class ContentTypeInterceptor {
    /**
     * @inheritdoc
     */
    intercept(request, next) {
        // there is no body content provided, skip guessing
        if (null === request.body || undefined === request.body) {
            return next.handle(request);
        }
        let contentType = request.headers.get('content-type');
        // there is a content type, nothing to guess...
        if (null !== contentType) {
            return next.handle(request);
        }
        if (request.body instanceof FormData) {
            let headers = request.headers.append('Content-Type', 'multipart/form-data');
            return next.handle(new HttpRequest(request.url, request.method, headers, request.body));
        }
        if (typeof request.body === 'object') {
            let headers = request.headers.append('Content-Type', 'application/json');
            return next.handle(new HttpRequest(request.url, request.method, headers, request.body));
        }
        if (typeof request.body === 'string') {
            let headers = request.headers.append('Content-Type', 'plain/text');
            return next.handle(new HttpRequest(request.url, request.method, headers, request.body));
        }
        // unable to guess, just pass it along.
        return next.handle(request);
    }
}
//# sourceMappingURL=content-type-interceptor.js.map