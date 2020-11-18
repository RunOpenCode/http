import {
    HttpHeadersInterface,
    RequestMethod,
} from '../contract';

/**
 * Client error is triggered when request could not be executed at all (e.g, network error).
 */
export class ClientError extends Error {

    private readonly _url: string;

    private readonly _method: RequestMethod;

    private readonly _headers: HttpHeadersInterface;

    private readonly _message: string;

    public constructor(url: string, method: RequestMethod, headers: HttpHeadersInterface, message: string) {
        super(message);
        this._url     = url;
        this._method  = method;
        this._headers = headers;
        this._message = message;

        Object.setPrototypeOf(this, ClientError.prototype);
    }

    /**
     * Get requested URL.
     */
    public get url(): string {
        return this._url;
    }

    /**
     * Get requested method.
     */
    public get method(): RequestMethod {
        return this._method;
    }

    /**
     * Get request headers.
     */
    public get headers(): HttpHeadersInterface {
        return this._headers;
    }

    /**
     * Get error message.
     */
    public get message(): string {
        return this._message;
    }

}
