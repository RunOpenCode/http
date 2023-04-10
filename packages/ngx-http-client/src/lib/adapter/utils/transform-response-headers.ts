import { HttpHeaders as AngularHttpHeaders } from '@angular/common/http';
import {
    HttpHeaders,
    HttpHeadersInterface,
}                                            from '@runopencode/http';

/**
 * Transform angular headers into headers.
 */
export function transformResponseHeaders(headers?: AngularHttpHeaders): HttpHeadersInterface {
    let headersMap: Map<string, string[]> = new Map<string, string[]>();

    if (headers) {
        headers.keys().forEach((name: string): void => {
            headers.set(name, headers.getAll(name) as string[]);
        });
    }

    return new HttpHeaders(headersMap);
}
