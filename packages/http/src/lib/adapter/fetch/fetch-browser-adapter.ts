import {
    Observable,
    Subscriber,
    TeardownLogic,
}                       from 'rxjs';
import {
    ClientError,
    HttpError,
}                       from '../../error';
import { HttpResponse } from '../../model';
import {
    HttpAdapterInterface,
    HttpRequestInterface,
    HttpRequestOptionsInterface,
    HttpResponseInterface,
}                       from '../../contract';
import {
    createContentResolver,
    transformRequestBody,
    transformRequestHeaders,
    transformResponseHeaders,
}                       from './utils';

export class FetchBrowserAdapter implements HttpAdapterInterface {

    /**
     * {@inheritdoc}
     */
    public execute<T>(
        request: HttpRequestInterface,
        options: HttpRequestOptionsInterface,
    ): Observable<HttpResponseInterface<T>> {
        return new Observable<HttpResponseInterface<T>>((observer: Subscriber<HttpResponseInterface<T>>): TeardownLogic => {
            let abortController: AbortController | null = new AbortController();
            let promise: Promise<Response>              = fetch(request.url, {
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
