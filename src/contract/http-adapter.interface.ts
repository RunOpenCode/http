/**
 * Request adapter actually handles request.
 */
import { Observable }            from 'rxjs';
import { HttpRequestInterface }  from './http-request.interface';
import { HttpResponseInterface } from './http-response.interface';

export interface HttpAdapterInterface {
    /**
     * Execute HTTP request.
     */
    execute<T>(request: HttpRequestInterface): Observable<HttpResponseInterface<T>>;
}
