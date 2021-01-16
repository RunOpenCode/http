import { Observable }            from 'rxjs';
import { HttpHandlerInterface }  from './http-handler.interface';
import { HttpRequestInterface }  from './http-request.interface';
import { HttpResponseInterface } from './http-response.interface';

/**
 * Interceptor allows interception of request-response lifecycle, which is useful
 * when implementing authentication, or any other kind of magic decoration of
 * HTTP request and/or response.
 */
export interface HttpInterceptorInterface {

    /**
     * Intercept HTTP request.
     *
     * You may intercept HTTP request, modify it and invoke next interceptor.
     * You may break interception chain and return your own response, or error it out.
     */
    intercept(request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface<any>>;
}
