import {
    HttpHeadersInterface,
    HttpRequestInterface,
    RequestMethod,
}                      from '../contract';
import { HttpHeaders } from './http-headers';

export class HttpRequest implements HttpRequestInterface {

    private readonly _url: string;

    private readonly _method: RequestMethod;

    private readonly _headers: HttpHeadersInterface;

    private readonly _body: any | null;

    public constructor(url: string, method: RequestMethod, headers?: HttpHeadersInterface, body?: any | null) {
        this._url     = url;
        this._method  = method;
        this._headers = headers || new HttpHeaders();
        this._body    = body;
    }

    /**
     * @inheritdoc
     */
    public get url(): string {
        return this._url;
    }

    /**
     * @inheritdoc
     */
    public get method(): RequestMethod {
        return this._method;
    }

    /**
     * @inheritdoc
     */
    public get headers(): HttpHeadersInterface {
        return this._headers;
    }

    /**
     * @inheritdoc
     */
    public get body(): any | null {
        return this._body;
    }

    /**
     * @inheritdoc
     */
    public clone(replace?: Partial<HttpRequestInterface>): HttpRequestInterface {
        // eslint-disable-next-line no-param-reassign
        replace = replace || {};

        return new HttpRequest(
            undefined !== replace.url ? replace.url : this._url,
            undefined !== replace.method ? replace.method : this._method,
            undefined !== replace.headers ? replace.headers : this._headers,
            undefined !== replace.body ? replace.body : this._body,
        );
    }

}
