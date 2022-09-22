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
     * Execute GET request on given URL.
     */
    get<T>(
        url: string,
        headers?: HttpHeadersInterface | null,
        options?: HttpRequestOptionsInterface | null,
    ): Observable<HttpResponseInterface<T>>;

    /**
     * Execute POST request on given URL.
     */
    post<T>(
        url: string,
        data: any | null,
        headers?: HttpHeadersInterface | null,
        options?: HttpRequestOptionsInterface | null,
    ): Observable<HttpResponseInterface<T>>;

    /**
     * Execute POST request on given URL.
     */
    patch<T>(
        url: string,
        data: any | null,
        headers?: HttpHeadersInterface | null,
        options?: HttpRequestOptionsInterface | null,
    ): Observable<HttpResponseInterface<T>>;

    /**
     * Execute DELETE request on given URL.
     */
    delete<T>(
        url: string,
        headers?: HttpHeadersInterface | null,
        options?: HttpRequestOptionsInterface | null,
    ): Observable<HttpResponseInterface<T>>

    /**
     * Execute request.
     */
    request<T>(
        request: HttpRequestInterface,
        options?: HttpRequestOptionsInterface | null,
    ): Observable<HttpResponseInterface<T>>;
}
