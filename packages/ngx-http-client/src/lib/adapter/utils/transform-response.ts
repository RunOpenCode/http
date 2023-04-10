import { HttpResponse as AngularHttpResponse } from '@angular/common/http';
import {
    HttpResponse,
    HttpResponseInterface,
}                                              from '@runopencode/http';
import { transformResponseHeaders }            from './transform-response-headers';

export function transformResponse<T>(response: AngularHttpResponse<unknown>): HttpResponseInterface<T> {
    return new HttpResponse<T>(
        response.url as string,
        response.status,
        transformResponseHeaders(response.headers),
        Promise.resolve(204 === response.status ? null : response.body) as Promise<T>,
    );
}
