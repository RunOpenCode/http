import { HttpHeaders } from './http-headers';
export class HttpRequest {
    constructor(url, method, headers, body) {
        this._url = url;
        this._method = method;
        this._headers = headers || new HttpHeaders();
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
    get method() {
        return this._method;
    }
    /**
     * @inheritdoc
     */
    get headers() {
        return this._headers;
    }
    /**
     * @inheritdoc
     */
    get body() {
        return this._body;
    }
}
//# sourceMappingURL=http-request.js.map