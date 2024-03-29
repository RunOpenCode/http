import { HttpResponseInterface } from '../contract';
import { AssertionError }        from '../error';

export function assertResponseIsSuccessful(response: HttpResponseInterface<unknown>): void {
    if (response.status >= 200 && response.status < 300) {
        return;
    }

    throw new AssertionError(response, `Expected response status code within range [200, 299], got: ${response.status}.`);
}

export function assertResponseStatusCode(response: HttpResponseInterface<unknown>, code: number): void {
    if (code === response.status) {
        return;
    }

    throw new AssertionError(response, `Expected response status code ${code}, got: ${response.status}.`);
}

export function assertResponseSatisfies(
    response: HttpResponseInterface<unknown>,
    predicate: (res: HttpResponseInterface<unknown>) => boolean,
): void;
export function assertResponseSatisfies(
    response: HttpResponseInterface<unknown>,
    predicate: (res: HttpResponseInterface<unknown>) => Promise<boolean>,
): Promise<void>;
export function assertResponseSatisfies(
    response: HttpResponseInterface<unknown>,
    predicate: (res: HttpResponseInterface<unknown>) => Promise<boolean> | boolean,
): Promise<void> | void {
    let result: Promise<boolean> | boolean = predicate(response);

    if (typeof result === 'boolean') {
        if (result) {
            return;
        }

        throw new AssertionError(response, 'Expected response to satisfy predicate.');
    }

    // eslint-disable-next-line consistent-return
    return result.then((res: boolean): Promise<void> => new Promise<void>((resolve: () => void, reject: (err: unknown) => void): void => {
        if (res) {
            resolve();
            return;
        }

        reject(new AssertionError(response, 'Expected response to satisfy predicate.'));
    }));
}
