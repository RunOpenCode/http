import { Observable }                from 'rxjs';
import {
    HttpHandlerInterface,
    HttpInterceptor,
    HttpInterceptorFunction,
    HttpRequestInterface,
    HttpResponseInterface,
} from '../contract';
import {
    convertInterceptor,
    isHttpInterceptorFunction,
} from './convert-interceptor';
import { VoidHttpInterceptor }       from './void-http-interceptor';

describe('isHttpInterceptorFunction()', (): void => {
    type TestCase = {
        input: HttpInterceptor,
        expected: boolean,
    };

    let cases: TestCase[] = [
        {
            input:    new VoidHttpInterceptor(),
            expected: false,
        },
        {
            input:    (request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface<unknown>> => next.handle(request),
            expected: true,
        },
    ];

    it.each(cases)('checks if is functional interceptor', ({ input, expected }: TestCase): void => {
        expect(isHttpInterceptorFunction(input)).toBe(expected);
    });
});

describe('convertInterceptor()', (): void => {

    it('skips conversion of object-oriented interceptor', (): void => {
        expect(convertInterceptor(new VoidHttpInterceptor())).toBeInstanceOf(VoidHttpInterceptor);
    });

    it('converts functional interceptor to object-oriented interceptor', (): void => {
        // eslint-disable-next-line max-len
        let fn: HttpInterceptorFunction = (request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface<unknown>> => next.handle(request);

        expect(isHttpInterceptorFunction(fn)).toBe(true);
        expect(isHttpInterceptorFunction(convertInterceptor(fn))).toBe(false);
    });
});
