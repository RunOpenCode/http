import { HttpRequestInterface } from '../../../contract';
import { transformRequestBody } from './transform-request-body';

describe('transformRequestBody', (): void => {

    it('converts body to JSON string if "Content-Type" is "application/json" and value type is "object".', (): void => {
        expect(transformRequestBody({
            headers: {
                get: (): string => 'application/json',
            },
            body:    {
                foo: 'bar',
            },
        } as any as HttpRequestInterface)).toBe('{"foo":"bar"}');
    });

    it('returns body as is if "Content-Type" is not "application/json".', (): void => {
        let body: FormData = new FormData();

        expect(transformRequestBody({
            headers: {
                get: (): string => 'multipart/form-data',
            },
            body:    body,
        } as any as HttpRequestInterface)).toBe(body);
    });

    it('returns body as is if body is not object.', (): void => {
        expect(transformRequestBody({
            headers: {
                get: (): string => 'multipart/form-data',
            },
            body:    '{"foo":"bar"}',
        } as any as HttpRequestInterface)).toBe('{"foo":"bar"}');
    });

});