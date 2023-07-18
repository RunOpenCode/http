import {
    HttpHeadersInterface,
    HttpRequestInterface,
    RequestMethod,
}                                  from '../../../contract';
import {
    HttpHeaders,
    HttpRequest,
}                                  from '../../../model';
import { transformRequestHeaders } from './transform-request-headers';

describe('transformRequestHeaders()', (): void => {

    let cases: Array<[HttpHeadersInterface, HeadersInit]> = [
        [new HttpHeaders({
            'Content-Type': 'application/json',
        }), {
            'Content-Type': 'application/json',
        }],
        [new HttpHeaders({
            'foo': ['bar', 'baz'],
        }), {
            'foo': 'bar;baz',
        }],
    ];
    
    it.each(cases)('transforms headers to fetch API headers.', (input: HttpHeadersInterface, expected: HeadersInit): void => {
        let request: HttpRequestInterface = new HttpRequest('foo', RequestMethod.GET, input);

        expect(transformRequestHeaders(request)).toStrictEqual(expected);
    });

});