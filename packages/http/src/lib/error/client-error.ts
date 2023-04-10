import {
    HttpHeadersInterface,
    RequestMethod,
} from '../contract';

/**
 * Client error is triggered when request could not be executed at all (e.g, network error).
 */
export class ClientError extends Error {

    /**
     * Get requested URL.
     */
    public readonly url: string;

    /**
     * Get requested method.
     */
    public readonly method: RequestMethod;

    /**
     * Get request headers.
     */
    public readonly headers: HttpHeadersInterface;

    public constructor(url: string, method: RequestMethod, headers: HttpHeadersInterface, message: string) {
        super(message);
        this.url     = url;
        this.method  = method;
        this.headers = headers;

        Object.setPrototypeOf(this, ClientError.prototype);
    }

}
