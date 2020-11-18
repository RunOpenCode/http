import { Observable } from 'rxjs';
import {
    HttpHandlerInterface,
    HttpRequestInterface,
    HttpResponseInterface,
}                     from '../contract';

/**
 * Actually executes http request.
 */
export class HttpRequestExecutor implements HttpHandlerInterface {

    private readonly executor: (request: HttpRequestInterface) => Observable<HttpResponseInterface>;

    public constructor(executor: (request: HttpRequestInterface) => Observable<HttpResponseInterface>) {
        this.executor = executor;
    }

    public handle(request: HttpRequestInterface): Observable<HttpResponseInterface> {
        return this.executor(request);
    }

}
