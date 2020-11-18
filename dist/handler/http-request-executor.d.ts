import { Observable } from 'rxjs';
import { HttpHandlerInterface, HttpRequestInterface, HttpResponseInterface } from '../contract';
/**
 * Actually executes http request.
 */
export declare class HttpRequestExecutor implements HttpHandlerInterface {
    private readonly executor;
    constructor(executor: (request: HttpRequestInterface) => Observable<HttpResponseInterface>);
    handle(request: HttpRequestInterface): Observable<HttpResponseInterface>;
}
//# sourceMappingURL=http-request-executor.d.ts.map