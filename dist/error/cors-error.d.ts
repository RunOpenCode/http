import { HttpHeadersInterface, RequestMethod } from '../contract';
/**
 * Client error is triggered when request could not be executed at all (e.g, network error).
 */
export declare class CORSError extends Error {
    private readonly _url;
    private readonly _method;
    private readonly _headers;
    private readonly _message;
    constructor(url: string, method: RequestMethod, headers: HttpHeadersInterface, message: string);
    /**
     * Get requested URL.
     */
    get url(): string;
    /**
     * Get requested method.
     */
    get method(): RequestMethod;
    /**
     * Get request headers.
     */
    get headers(): HttpHeadersInterface;
    /**
     * Get error message.
     */
    get message(): string;
}
//# sourceMappingURL=cors-error.d.ts.map