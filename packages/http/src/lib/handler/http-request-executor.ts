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

    private readonly _executor: (request: HttpRequestInterface) => Observable<HttpResponseInterface<unknown>>;

    public constructor(executor: (request: HttpRequestInterface) => Observable<HttpResponseInterface<unknown>>) {
        this._executor = executor;
    }

    public handle(request: HttpRequestInterface): Observable<HttpResponseInterface<unknown>> {
        return this._executor(request);
    }

}
