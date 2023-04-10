import { HttpErrorResponse as AngularHttpErrorResponse } from '@angular/common/http';
import {
    ClientError,
    CORSError,
    HttpError,
    HttpRequestInterface,
    HttpRequestOptionsInterface,
}                                                        from '@runopencode/http';
import { transformResponseHeaders }                      from './transform-response-headers';

export function transformError(request: HttpRequestInterface, error: AngularHttpErrorResponse, options: HttpRequestOptionsInterface): Error {
    if (0 === error.status) {
        return new CORSError(
            error.url as string,
            request.method,
            transformResponseHeaders(error.headers),
            error.message,
        );
    }

    if (error.error instanceof ErrorEvent) {
        return new ClientError(
            request.url,
            request.method,
            request.headers,
            error.error.message,
        );
    }

    return new HttpError(
        error.url as string,
        error.status,
        request.method,
        transformResponseHeaders(error.headers),
        error.message,
        (): Promise<string | object> => {
            if ('text' === options.errorType) {
                let text: string = 'string' === typeof error.error ? error.error : JSON.stringify(error.error);
                return Promise.resolve(text);
            }

            return new Promise<string | object>((resolve: (arg: object) => void, reject: (e: Error) => void) => {
                try {
                    let object: object = 'object' === typeof error.error ? error.error : JSON.parse(error.error);
                    resolve(object);
                } catch (e) {
                    reject(e);
                }
            });
        },
    );
}
