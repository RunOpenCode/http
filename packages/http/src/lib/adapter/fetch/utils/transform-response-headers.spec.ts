import { HttpHeadersInterface }     from '../../../contract';
import { HttpHeaders }              from '../../../model';
import { transformResponseHeaders } from './transform-response-headers';

describe('transformResponseHeaders()', (): void => {

    let cases: Array<[Headers, HttpHeadersInterface]> = [
        [
            new Headers({
                'Content-Type': 'application/json',
            }),
            new HttpHeaders({
                'content-type': 'application/json',
            }),
        ],
        [
            new Headers({
                foo: 'bar;baz',
            }),
            new HttpHeaders({
                foo: ['bar;baz'],
            }),
        ],
    ];

    it.each(cases)('transforms fetch API headers to lib headers.', (input: Headers, expected: HttpHeadersInterface): void => {
        let response: Response = {
            headers: input,
        } as Response;

        expect(transformResponseHeaders(response)).toStrictEqual(expected);
    });

});
