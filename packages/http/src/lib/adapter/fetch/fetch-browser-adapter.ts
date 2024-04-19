import {
    Observable,
    Subscriber,
    TeardownLogic,
}                from 'rxjs';
import {
    createDefaultHttpRequestOptions,
    HttpAdapterInterface,
    HttpRequestInterface,
    HttpRequestOptionsInterface,
    HttpResponseInterface,
}                from '../../contract';
import {
    ClientError,
    HttpError,
}                       from '../../error';
import { HttpResponse } from '../../model';
import {
    createContentResolver,
    transformRequestBody,
    transformRequestHeaders,
    transformResponseHeaders,
}                       from './utils';

export class FetchBrowserAdapter implements HttpAdapterInterface {

    private readonly _fetchFn: typeof fetch;

    public constructor(fetchFn: typeof fetch = null) {
        this._fetchFn = fetchFn || function fetchProxy(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
            return fetch(input, init);
        };
    }

    /**
     * {@inheritdoc}
     */
    public execute<T>(
        request: HttpRequestInterface,
        options: HttpRequestOptionsInterface = {},
    ): Observable<HttpResponseInterface<T>> {
        // eslint-disable-next-line no-param-reassign
        options = createDefaultHttpRequestOptions(options);

        return new Observable<HttpResponseInterface<T>>((observer: Subscriber<HttpResponseInterface<T>>): TeardownLogic => {
            let abortController: AbortController | null = new AbortController();
            let promise: Promise<Response>              = this._fetchFn(request.url, {
                signal:      abortController.signal,
                method:      request.method,
                headers:     transformRequestHeaders(request),
                body:        transformRequestBody(request),
                credentials: options.withCredentials ? 'include' : undefined,
            });

            promise.then(async (response: Response): Promise<void> => {
                abortController = null;

                if (response.ok) {
                    observer.next(new HttpResponse<T>(
                        response.url,
                        response.status,
                        transformResponseHeaders(response),
                        createContentResolver<T>(response, options.responseType),
                    ));

                    observer.complete();
                    return;
                }

                observer.error(new HttpError(
                    request.url,
                    response.status,
                    request.method,
                    transformResponseHeaders(response),
                    response.statusText,
                    createContentResolver<T>(response, options.errorType),
                ));

            }).catch((error: Error): void => {
                abortController = null;

                // If the request was aborted, we don't want to throw an error.
                if (error instanceof DOMException && 'AbortError' === error.name) {
                    if (!observer.closed) {
                        observer.complete();
                    }

                    return;
                }

                // NOTE: fetch can not detect CORS errors.
                observer.error(new ClientError(
                    request.url,
                    request.method,
                    request.headers,
                    error.message,
                ));
            });

            return (): void => {
                abortController?.abort();
            };
        });
    }

}
