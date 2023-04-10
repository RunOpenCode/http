import { HttpResponseInterface } from '../contract';

/**
 * This error will be triggered when response does not satisfy given assertion.
 */
export class AssertionError extends Error {

    public readonly response: HttpResponseInterface<unknown>;

    public constructor(response: HttpResponseInterface<unknown>, message: string = null) {
        super(message || 'Assertion of response failed.');
        this.response = response;
        Object.setPrototypeOf(this, Error.prototype);
    }

}
