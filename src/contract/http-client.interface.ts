import { Observable }            from 'rxjs';
import { HttpHeadersInterface }  from './http-headers.interface';
import { HttpRequestInterface }  from './http-request.interface';
import { HttpResponseInterface } from './http-response.interface';

/**
 * Abstraction of HTTP client service.
 */
export interface HttpClientInterface {

    /**
     * Execute GET request on given URL.
     */
    get(url: string, headers?: HttpHeadersInterface): Observable<HttpResponseInterface>;

    /**
     * Execute POST request on given URL.
     */
    post(url: string, data: any | null, headers?: HttpHeadersInterface): Observable<HttpResponseInterface>;

    /**
     * Execute POST request on given URL.
     */
    patch(url: string, data: any | null, headers?: HttpHeadersInterface): Observable<HttpResponseInterface>;

    /**
     * Execute request.
     */
    request(request: HttpRequestInterface): Observable<HttpResponseInterface>;
}
