import { Observable }                  from 'rxjs';
import { HttpHeadersInterface }        from './http-headers.interface';
import { HttpRequestOptionsInterface } from './http-request-options.interface';
import { HttpRequestInterface }        from './http-request.interface';
import { HttpResponseInterface }       from './http-response.interface';

/**
 * Abstraction of HTTP client service.
 */
export interface HttpClientInterface {

    /**
     * Execute HEAD request on given URL.
     */
    head<T>(
        url: string,
        data: unknown,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>>;

    /**
     * Execute GET request on given URL.
     */
    get<T>(
        url: string,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>>;

    /**
     * Execute POST request on given URL.
     */
    post<T>(
        url: string,
        data: unknown,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>>;

    /**
     * Execute PATCH request on given URL.
     */
    patch<T>(
        url: string,
        data: unknown,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>>;

    /**
     * Execute PUT request on given URL.
     */
    put<T>(
        url: string,
        data: unknown,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>>;

    /**
     * Execute DELETE request on given URL.
     */
    delete<T>(
        url: string,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>>

    /**
     * Execute request.
     */
    request<T>(
        request: HttpRequestInterface,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>>;
}
