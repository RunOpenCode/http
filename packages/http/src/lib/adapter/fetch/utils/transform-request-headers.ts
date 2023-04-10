import {
    HttpHeadersInterface,
    HttpRequestInterface,
} from '../../../contract';

/**
 * Transform headers to fetch API format.
 *
 * @internal
 */
export function transformRequestHeaders(request: HttpRequestInterface): HeadersInit {
    let headers: HttpHeadersInterface = request.headers;
    let result: HeadersInit           = {};

    let keys: string[] = headers.keys();

    keys.forEach((key: string): void => {
        result[key] = headers.getAll(key).join(';');
    });

    return result;
}
