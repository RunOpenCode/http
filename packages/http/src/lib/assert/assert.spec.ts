import { HttpResponseInterface } from '../contract';
import {
    assertResponseIsSuccessful,
    assertResponseSatisfies,
    assertResponseStatusCode,
}                                from './assert';

describe('assertResponseIsSuccessful()', (): void => {

    it.each([200, 201, 202, 203, 204, 205, 206, 207, 208, 226])('asserts that response is successful.', (code: number): void => {
        expect((): void => {
            assertResponseIsSuccessful({
                status: code,
            } as HttpResponseInterface<unknown>);
        }).not.toThrowError();
    });

    it.each([101, 301, 400, 401, 402, 403, 404, 500, 526])('asserts that response is not successful.', (code: number): void => {
        expect((): void => {
            assertResponseIsSuccessful({
                status: code,
            } as HttpResponseInterface<unknown>);
        }).toThrowError(`Expected response status code within range [200, 299], got: ${code}.`);
    });
});

describe('assertResponseStatusCode()', (): void => {

    it('asserts that response status code is equal to expected.', (): void => {
        expect((): void => {
            assertResponseStatusCode({
                status: 200,
            } as HttpResponseInterface<unknown>, 200);
        }).not.toThrowError();
    });

    it('asserts that response status code is not equal to expected.', (): void => {
        expect((): void => {
            assertResponseStatusCode({
                status: 404,
            } as HttpResponseInterface<unknown>, 200);
        }).toThrowError();
    });
});

describe('assertResponseSatisfies()', (): void => {

    it('asserts that response satisfies sync predicate.', (): void => {
        let spy: jest.Mock                           = jest.fn((): boolean => true);
        let response: HttpResponseInterface<unknown> = {} as HttpResponseInterface<unknown>;

        expect((): void => {
            assertResponseSatisfies(response, spy);
        }).not.toThrowError();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(response);
    });

    it('asserts that response satisfies async predicate.', (): void => {
        let spy: jest.Mock<Promise<boolean>>         = jest.fn((): Promise<boolean> => Promise.resolve(true));
        let response: HttpResponseInterface<unknown> = {} as HttpResponseInterface<unknown>;

        expect(assertResponseSatisfies(response, spy)).resolves.toBeUndefined();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(response);
    });

    it('asserts that response does not satisfies sync predicate.', (): void => {
        let spy: jest.Mock                           = jest.fn((): boolean => false);
        let response: HttpResponseInterface<unknown> = {} as HttpResponseInterface<unknown>;

        expect((): void => {
            assertResponseSatisfies(response, spy);
        }).toThrowError();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(response);
    });

    it('asserts that response does not satisfies async predicate.', (): void => {
        let spy: jest.Mock<Promise<boolean>>         = jest.fn((): Promise<boolean> => Promise.resolve(false));
        let response: HttpResponseInterface<unknown> = {} as HttpResponseInterface<unknown>;

        expect(assertResponseSatisfies(response, spy)).rejects.toThrowError('Expected response to satisfy predicate.');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(response);
    });
});
