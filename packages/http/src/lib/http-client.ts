import { Observable }  from 'rxjs';
import {
    HttpAdapterInterface,
    HttpClientInterface,
    HttpHandlerInterface,
    HttpHeadersInterface,
    HttpInterceptor,
    HttpInterceptorInterface,
    HttpRequestInterface,
    HttpRequestOptionsInterface,
    HttpResponseInterface,
    RequestMethod,
}                      from './contract';
import {
    HttpHandler,
    HttpRequestExecutor,
}                      from './handler';
import {
    convertInterceptor,
    VoidHttpInterceptor,
}                      from './interceptor';
import { HttpRequest } from './model';

export class HttpClient implements HttpClientInterface {

    private readonly _adapter: HttpAdapterInterface;

    private readonly _interceptors: HttpInterceptorInterface[];

    public constructor(
        adapter: HttpAdapterInterface,
        interceptors: HttpInterceptor[] = [],
    ) {
        this._interceptors = interceptors.map((interceptor: HttpInterceptor): HttpInterceptorInterface => convertInterceptor(interceptor));
        this._adapter      = adapter;
    }

    /**
     * {@inheritdoc}
     */
    public get<T>(
        url: string,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>> {
        let request: HttpRequestInterface = new HttpRequest(url, RequestMethod.GET, headers);
        return this.request(request, options);
    }

    /**
     * {@inheritdoc}
     */
    public post<T>(
        url: string,
        data: unknown,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>> {
        let request: HttpRequestInterface = new HttpRequest(url, RequestMethod.POST, headers, data);
        return this.request(request, options);
    }

    /**
     * {@inheritdoc}
     */
    public patch<T>(
        url: string,
        data: unknown,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>> {
        let request: HttpRequestInterface = new HttpRequest(url, RequestMethod.PATCH, headers, data);
        return this.request(request, options);
    }

    /**
     * {@inheritdoc}
     */
    public delete<T>(
        url: string,
        headers?: HttpHeadersInterface | null | undefined,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>> {
        let request: HttpRequestInterface = new HttpRequest(url, RequestMethod.DELETE, headers);
        return this.request(request, options);
    }

    /**
     * {@inheritdoc}
     */
    // eslint-disable-next-line consistent-return
    public request<T>(
        request: HttpRequestInterface,
        options?: HttpRequestOptionsInterface | null | undefined,
    ): Observable<HttpResponseInterface<T>> {

        // eslint-disable-next-line no-param-reassign
        options = {
            ...{
                responseType:    'json',
                errorType:       'json',
                withCredentials: false,
            },
            ...(options || {}),
        };

        // there are no interceptors
        if (0 === this._interceptors.length) {
            return this._adapter.execute(request, options);
        }

        // there is no need to iterate trough interceptors, we have only one, and it is dummy interceptor.
        if (1 === this._interceptors.length && this._interceptors[0] instanceof VoidHttpInterceptor) {
            return this._adapter.execute(request, options);
        }

        let previous: HttpHandlerInterface = new HttpRequestExecutor(
            (req: HttpRequestInterface): Observable<HttpResponseInterface<T>> => this._adapter.execute(req, options),
        );

        for (let i: number = this._interceptors.length - 1; i >= 0; i--) {
            let handler: HttpHandlerInterface = new HttpHandler(this._interceptors[i], previous);
            previous                          = handler;

            if (0 === i) {
                return handler.handle(request) as Observable<HttpResponseInterface<T>>;
            }
        }

        // this exception is impossible to be thrown, but it is here to satisfy TypeScript compiler.
        throw new Error('Impossible condition met.');
    }

}
