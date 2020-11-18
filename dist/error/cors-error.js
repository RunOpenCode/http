/**
 * Client error is triggered when request could not be executed at all (e.g, network error).
 */
export class CORSError extends Error {
    constructor(url, method, headers, message) {
        super(message);
        this._url = url;
        this._method = method;
        this._headers = headers;
        this._message = message;
        Object.setPrototypeOf(this, CORSError.prototype);
    }
    /**
     * Get requested URL.
     */
    get url() {
        return this._url;
    }
    /**
     * Get requested method.
     */
    get method() {
        return this._method;
    }
    /**
     * Get request headers.
     */
    get headers() {
        return this._headers;
    }
    /**
     * Get error message.
     */
    get message() {
        return this._message;
    }
}
//# sourceMappingURL=cors-error.js.map