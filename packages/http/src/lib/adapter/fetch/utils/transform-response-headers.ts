import { HttpHeadersInterface } from '../../../contract';
import { HttpHeaders }          from '../../../model';

/**
 * Transform response headers to format defined within this library contract.
 *
 * @internal
 */
export function transformResponseHeaders(response: Response): HttpHeadersInterface {
    let headers: Headers                  = response.headers;
    let result: { [key: string]: string } = {};

    headers.forEach((value: string, key: string): void => {
        result[key] = value;
    });

    return new HttpHeaders(result);
}
