import { Observable }            from 'rxjs';
import { HttpHandlerInterface }  from './http-handler.interface';
import { HttpRequestInterface }  from './http-request.interface';
import { HttpResponseInterface } from './http-response.interface';

/**
 * Interceptor allows interception of request-response lifecycle, which is useful
 * when implementing authentication, or any other kind of magic decoration of
 * HTTP request and/or response.
 */
export interface HttpInterceptorInterface<T = unknown> {

    /**
     * Intercept HTTP request.
     *
     * You may intercept HTTP request, modify it and invoke next interceptor.
     * You may break interception chain and return your own response, or error it out.
     */
    intercept(request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface<T>>;
}

/**
 * Beside OO style, you may also use functional style of interceptors.
 */
// eslint-disable-next-line max-len
export type HttpInterceptorFunction<T = unknown> = (request: HttpRequestInterface, next: HttpHandlerInterface) => Observable<HttpResponseInterface<T>>;

/**
 * Interceptor may be either object-oriented or functional.
 */
export type HttpInterceptor<T = unknown> = HttpInterceptorInterface<T> | HttpInterceptorFunction<T>;
