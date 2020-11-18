/**
 * HTTP Error is value object containing data about occurred error
 * when executing HTTP request.
 */
export class HttpError extends Error {
    constructor(url, status, method, headers, message, body) {
        super();
        this._url = url;
        this._status = status;
        this._method = method;
        this._headers = headers;
        this._message = message;
        this._body = body;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
    /**
     * Get requested url.
     */
    get url() {
        return this._url;
    }
    /**
     * Get status code.
     */
    get status() {
        return this._status;
    }
    /**
     * Get request method.
     */
    get method() {
        return this._method;
    }
    /**
     * Get headers.
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
    /**
     * Get response body (if any).
     */
    get body() {
        return this._body;
    }
    /**
     * Get response content as JSON object.
     */
    get json() {
        return new Promise((resolve, reject) => {
            if (undefined !== this._json) {
                resolve(this._json);
                return;
            }
            if (null === this._body || undefined === this._body || '' === this._body.trim()) {
                this._json = null;
                resolve(this.json);
            }
            try {
                this._json = JSON.parse(this._body);
                resolve(this.json);
            }
            catch (e) {
                reject();
            }
        });
    }
}
//# sourceMappingURL=http-error.js.map