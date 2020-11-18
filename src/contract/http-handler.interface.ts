import { Observable }            from 'rxjs';
import { HttpRequestInterface }  from './http-request.interface';
import { HttpResponseInterface } from './http-response.interface';

/**
 * Handler handles request.
 */
export interface HttpHandlerInterface {

    /**
     * Handle request.
     */
    handle(request: HttpRequestInterface): Observable<HttpResponseInterface>;
}
