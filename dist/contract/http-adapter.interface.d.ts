/**
 * Request adapter actually handles request.
 */
import { Observable } from 'rxjs';
import { HttpRequestInterface } from './http-request.interface';
import { HttpResponseInterface } from './http-response.interface';
export interface HttpAdapterInterface {
    /**
     * Execute HTTP request.
     */
    execute(request: HttpRequestInterface): Observable<HttpResponseInterface>;
}
//# sourceMappingURL=http-adapter.interface.d.ts.map