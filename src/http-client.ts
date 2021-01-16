import { Observable }          from 'rxjs';
import {
    HttpAdapterInterface,
    HttpClientInterface,
    HttpHandlerInterface,
    HttpHeadersInterface,
    HttpInterceptorInterface,
    HttpRequestInterface,
    HttpResponseInterface,
    RequestMethod,
}                              from './contract';
import {
    HttpHandler,
    HttpRequestExecutor,
}                              from './handler';
import { VoidHttpInterceptor } from './interceptor';
import { HttpRequest }         from './model';

export class HttpClient implements HttpClientInterface {

    private readonly _adapter: HttpAdapterInterface;

    private readonly _interceptors: HttpInterceptorInterface[];

    public constructor(
        adapter: HttpAdapterInterface,
        interceptors: HttpInterceptorInterface[] = [],
    ) {
        this._interceptors = interceptors;
        this._adapter      = adapter;
    }

    /**
     * @inheritdoc
     */
    public get<T>(url: string, headers?: HttpHeadersInterface): Observable<HttpResponseInterface<T>> {
        let request: HttpRequestInterface = new HttpRequest(url, RequestMethod.GET, headers);
        return this.request(request);
    }

    /**
     * @inheritdoc
     */
    public patch<T>(url: string, data: any, headers?: HttpHeadersInterface): Observable<HttpResponseInterface<T>> {
        let request: HttpRequestInterface = new HttpRequest(url, RequestMethod.PATCH, headers, data);
        return this.request(request);
    }

    /**
     * @inheritdoc
     */
    public post<T>(url: string, data: any, headers?: HttpHeadersInterface): Observable<HttpResponseInterface<T>> {
        let request: HttpRequestInterface = new HttpRequest(url, RequestMethod.POST, headers, data);
        return this.request(request);
    }

    /**
     * @inheritdoc
     */
    // eslint-disable-next-line consistent-return
    public request<T>(request: HttpRequestInterface): Observable<HttpResponseInterface<T>> {

        // there are no interceptors
        if (0 === this._interceptors.length) {
            return this._adapter.execute(request);
        }

        // there is no need to iterate trough interceptors, we have only one, and it is dummy interceptor.
        if (1 === this._interceptors.length && this._interceptors[0] instanceof VoidHttpInterceptor) {
            return this._adapter.execute(request);
        }

        let previous: HttpHandlerInterface = new HttpRequestExecutor(
            (req: HttpRequestInterface): Observable<HttpResponseInterface<T>> => this._adapter.execute(req),
        );

        for (let i: number = this._interceptors.length - 1; i >= 0; i--) {
            let handler: HttpHandlerInterface = new HttpHandler(this._interceptors[i], previous);
            previous                          = handler;

            if (0 === i) {
                return handler.handle(request);
            }
        }
    }

}
