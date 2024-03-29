import {
    HttpClient as AngularHttpClient,
    HttpErrorResponse as AngularHttpErrorResponse,
    HttpHeaders as AngularHttpHeaders,
    HttpParams as AngularHttpParams,
    HttpResponse as AngularHttpResponse,
} from '@angular/common/http';
import {
    HttpAdapterInterface,
    HttpRequestInterface,
    HttpRequestOptionsInterface,
    HttpResponseInterface,
} from '@runopencode/http';
import {
    Observable,
    throwError,
} from 'rxjs';
import {
    catchError,
    map,
} from 'rxjs/operators';
import {
    transformError,
    transformRequestHeaders,
    transformResponse,
} from './utils';

type AngularRequestOptions = {
    body?: unknown;
    headers?: AngularHttpHeaders | {
        [header: string]: string | string[];
    };
    params?: AngularHttpParams | {
        [param: string]: string | string[];
    };
    observe: 'events' | 'response';
    reportProgress?: boolean;
    responseType: 'arraybuffer' | 'text' | 'blob' | 'json';
    withCredentials?: boolean;
};

export class AngularHttpAdapter implements HttpAdapterInterface {

    private readonly _http: AngularHttpClient;

    public constructor(http: AngularHttpClient) {
        this._http = http;
    }

    public execute<T>(request: HttpRequestInterface, options: HttpRequestOptionsInterface = {}): Observable<HttpResponseInterface<T>> {
        let requestOptions: AngularRequestOptions = {
            observe:         'response',
            responseType:    options.responseType as 'arraybuffer' | 'text' | 'blob' | 'json',
            headers:         transformRequestHeaders(request.headers),
            body:            request.body,
            withCredentials: options.withCredentials,
        };

        return this
            ._http
            .request(request.method, request.url, requestOptions)
            // eslint-disable-next-line max-len
            .pipe(catchError((error: AngularHttpErrorResponse): Observable<never> => throwError(transformError(request, error, options))))
            .pipe(map((response: AngularHttpResponse<unknown>) => transformResponse<T>(response)));
    }

}
