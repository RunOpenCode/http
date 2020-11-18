import { Observable } from 'rxjs';
import { HttpAdapterInterface, HttpClientInterface, HttpHeadersInterface, HttpInterceptorInterface, HttpRequestInterface, HttpResponseInterface } from './contract';
export declare class HttpClient implements HttpClientInterface {
    private readonly _adapter;
    private readonly _interceptors;
    constructor(adapter: HttpAdapterInterface, interceptors?: HttpInterceptorInterface[]);
    /**
     * @inheritdoc
     */
    get(url: string, headers?: HttpHeadersInterface): Observable<HttpResponseInterface>;
    /**
     * @inheritdoc
     */
    patch(url: string, data: any, headers?: HttpHeadersInterface): Observable<HttpResponseInterface>;
    /**
     * @inheritdoc
     */
    post(url: string, data: any, headers?: HttpHeadersInterface): Observable<HttpResponseInterface>;
    /**
     * @inheritdoc
     */
    request(request: HttpRequestInterface): Observable<HttpResponseInterface>;
}
//# sourceMappingURL=http-client.d.ts.map