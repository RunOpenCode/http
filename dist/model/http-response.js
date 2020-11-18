/**
 * HTTP Response is value object containing data received from
 * server when executing HTTP request.
 */
export class HttpResponse {
    constructor(url, status, body, headers) {
        this._url = url;
        this._status = status;
        this._headers = headers;
        this._body = body;
    }
    /**
     * @inheritdoc
     */
    get url() {
        return this._url;
    }
    /**
     * @inheritdoc
     */
    get status() {
        return this._status;
    }
    /**
     * @inheritdoc
     */
    get headers() {
        return this._headers;
    }
    get body() {
        return this._body;
    }
    /**
     * @inheritdoc
     */
    get text() {
        return Promise.resolve(this._body);
    }
    /**
     * @inheritdoc
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
//# sourceMappingURL=http-response.js.map