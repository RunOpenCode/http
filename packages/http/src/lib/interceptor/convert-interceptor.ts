import {
    HttpInterceptor,
    HttpInterceptorFunction,
    HttpInterceptorInterface,
} from '../contract';

/**
 * Check if given interceptor is functional interceptor.
 *
 * @internal
 */
export function isHttpInterceptorFunction<T = unknown>(interceptor: HttpInterceptor<T>): interceptor is HttpInterceptorFunction<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return 'function' === typeof interceptor && undefined === (interceptor as any).intercept;
}

/**
 * Convert functional interceptor to object-oriented interceptor in order
 * to simplify implementation of http client when using interceptors.
 *
 * @internal
 */
export function convertInterceptor(interceptor: HttpInterceptor): HttpInterceptorInterface {
    return isHttpInterceptorFunction(interceptor) ? {
        intercept: interceptor,
    } : interceptor;
}
