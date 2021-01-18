import {
    AsyncSubject,
    Observable,
} from 'rxjs';
import {
    ClientError,
    HttpError,
} from '../error';
import {
    HttpHeaders,
    HttpResponse,
} from '../model';
import {
    HttpAdapterInterface,
    HttpHeadersInterface,
    HttpRequestInterface,
    HttpResponseInterface,
} from '../contract';

export class FetchBrowserAdapter implements HttpAdapterInterface {

    public execute<T>(request: HttpRequestInterface): Observable<HttpResponseInterface<T>> {
        let body: any = request.body;

        if ('application/json' === request.headers.get('Content-Type') && typeof body === 'object') {
            body = JSON.stringify(request.body);
        }

        let promise: Promise<Response> = fetch(request.url, {
            method:  request.method,
            headers: FetchBrowserAdapter.transform(request.headers),
            body:    body,
        });

        let observable: AsyncSubject<HttpResponseInterface<T>> = new AsyncSubject<HttpResponseInterface<T>>();

        promise.then(async (response: Response): Promise<void> => {
            let data: string = await response.text();

            if (response.status >= 200 && response.status < 300) {
                observable.next(new HttpResponse(
                    response.url,
                    response.status,
                    data,
                    new HttpHeaders(FetchBrowserAdapter.reverse(response.headers)),
                ));
                observable.complete();

                return;
            }

            observable.error(new HttpError(
                request.url,
                response.status,
                request.method,
                new HttpHeaders(FetchBrowserAdapter.reverse(response.headers)),
                response.statusText,
                data,
            ));
            observable.complete();
        });
        promise.catch((error: Error) => {
            // NOTE: fetch can not detect CORS errors.
            observable.error(new ClientError(
                request.url,
                request.method,
                request.headers,
                error.message,
            ));
            observable.complete();
        });

        return observable.asObservable();
    }

    private static transform(headers?: HttpHeadersInterface): { [key: string]: string } {
        let result: { [name: string]: string } = {};

        if (!headers) {
            return result;
        }

        let keys: string[] = headers.keys();

        keys.forEach((key: string) => {
            result[key] = headers.getAll(key).join(';');
        });

        return result;
    }

    private static reverse(headers?: Headers): { [key: string]: string } {
        let result: { [key: string]: string } = {};

        if (!headers) {
            return result;
        }

        headers.forEach((value: string, key: string) => {
            result[key] = value;
        });

        return result;
    }

}
