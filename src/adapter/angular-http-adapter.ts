import {
    HttpClient as AngularHttpClient,
    HttpErrorResponse as AngularHttpErrorResponse,
    HttpResponse as AngularHttpResponse,
    HttpHeaders as AngularHttpHeaders,
    HttpParams as AngularHttpParams,
// eslint-disable-next-line import/no-extraneous-dependencies
} from '@angular/common/http';
import {
    Observable,
    throwError,
} from 'rxjs';
import {
    catchError,
    map,
} from 'rxjs/operators';
import {
    HttpAdapterInterface,
    HttpHeadersInterface,
    HttpRequestInterface,
    HttpResponseInterface,
} from '../contract';
import {
    ClientError,
    CORSError,
    HttpError,
} from '../error';
import {
    HttpHeaders,
    HttpResponse,
} from '../model';

export class AngularHttpAdapter implements HttpAdapterInterface {

    private readonly _http: AngularHttpClient;

    public constructor(http: AngularHttpClient) {
        this._http = http;
    }

    public execute<T>(request: HttpRequestInterface): Observable<HttpResponseInterface<T>> {
        let options: {
            body?: any;
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
        } = {
            observe:      'response',
            responseType: 'text',
        };

        if (request.body) {
            options.body = request.body;
        }

        if (request.headers) {
            options.headers = AngularHttpAdapter.transform(request.headers);
        }

        return this
            ._http
            .request(request.method, request.url, options)
            .pipe(catchError((error: AngularHttpErrorResponse) => throwError(AngularHttpAdapter.transformError(request, error))))
            .pipe(map((response: AngularHttpResponse<any>) => AngularHttpAdapter.transformResponse<T>(response)));
    }

    private static transformResponse<T>(response: AngularHttpResponse<any>): HttpResponseInterface<T> {
        return new HttpResponse<T>(
            response.url,
            response.status,
            response.body,
            AngularHttpAdapter.reverse(response.headers),
        );
    }

    private static transformError(request: HttpRequestInterface, error: AngularHttpErrorResponse): Error {
        if (error.error instanceof ErrorEvent || 0 === error.status) {
            return new ClientError(
                request.url,
                request.method,
                request.headers,
                error.error.message,
            );
        }

        let headers: Map<string, string[]> = new Map<string, string[]>();
        error.headers.keys().forEach((name: string) => {
            headers.set(name, error.headers.getAll(name));
        });

        if (0 === error.status) {
            return new CORSError(
                error.url,
                request.method,
                new HttpHeaders(headers),
                error.message,
            );
        }

        return new HttpError<any>(
            error.url,
            error.status,
            request.method,
            new HttpHeaders(headers),
            error.message,
            error.error,
        );
    }

    /**
     * Transform headers into angular headers.
     */
    private static transform(headers?: HttpHeadersInterface): AngularHttpHeaders {
        if (!headers) {
            return new AngularHttpHeaders();
        }

        let keys: string[]                       = headers.keys();
        let result: { [name: string]: string[] } = {};

        keys.forEach((key: string) => {
            result[key] = headers.getAll(key);
        });

        return new AngularHttpHeaders(result);
    }

    /**
     * Transform angular headers into headers.
     */
    private static reverse(headers?: AngularHttpHeaders): HttpHeadersInterface {
        let headersMap: Map<string, string[]> = new Map<string, string[]>();
        headers.keys().forEach((name: string) => {
            headers.set(name, headers.getAll(name));
        });

        return new HttpHeaders(headersMap);
    }

}
