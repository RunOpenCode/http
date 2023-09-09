/**
 * Request adapter actually handles request.
 */
import { Observable }                  from 'rxjs';
import { HttpRequestOptionsInterface } from './http-request-options.interface';
import { HttpRequestInterface }        from './http-request.interface';
import { HttpResponseInterface }       from './http-response.interface';

export interface HttpAdapterInterface {
    /**
     * Execute HTTP request.
     */
    execute<T>(
        request: HttpRequestInterface,
        options?: HttpRequestOptionsInterface,
    ): Observable<HttpResponseInterface<T>>;
}
