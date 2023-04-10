import { HttpHeaders as AngularHttpHeaders } from '@angular/common/http';
import { HttpHeadersInterface }              from '@runopencode/http';

/**
 * Transform headers into angular headers.
 */
export function transformRequestHeaders(headers: HttpHeadersInterface): AngularHttpHeaders {
    let keys: string[]                       = headers.keys();
    let result: { [name: string]: string[] } = {};

    keys.forEach((key: string): void => {
        result[key] = headers.getAll(key) as string[];
    });

    return new AngularHttpHeaders(result);
}
