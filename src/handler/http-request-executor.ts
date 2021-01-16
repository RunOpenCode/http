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

    private readonly executor: (request: HttpRequestInterface) => Observable<HttpResponseInterface<any>>;

    public constructor(executor: (request: HttpRequestInterface) => Observable<HttpResponseInterface<any>>) {
        this.executor = executor;
    }

    public handle(request: HttpRequestInterface): Observable<HttpResponseInterface<any>> {
        return this.executor(request);
    }

}
