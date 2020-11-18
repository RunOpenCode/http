import { HttpHeadersInterface, RequestMethod } from '../contract';
/**
 * HTTP Error is value object containing data about occurred error
 * when executing HTTP request.
 */
export declare class HttpError extends Error {
    private readonly _url;
    private readonly _status;
    private readonly _method;
    private readonly _headers;
    private readonly _message;
    private readonly _body;
    private _json;
    constructor(url: string, status: number, method: RequestMethod, headers: HttpHeadersInterface, message: string, body: any | null);
    /**
     * Get requested url.
     */
    get url(): string;
    /**
     * Get status code.
     */
    get status(): number;
    /**
     * Get request method.
     */
    get method(): RequestMethod;
    /**
     * Get headers.
     */
    get headers(): HttpHeadersInterface;
    /**
     * Get error message.
     */
    get message(): string;
    /**
     * Get response body (if any).
     */
    get body(): any;
    /**
     * Get response content as JSON object.
     */
    get json(): Promise<any | null>;
}
//# sourceMappingURL=http-error.d.ts.map