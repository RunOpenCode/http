import {
    HttpHeadersInterface,
    HttpRequestInterface,
    RequestMethod,
}                      from '../contract';
import { HttpHeaders } from './http-headers';

export class HttpRequest implements HttpRequestInterface {

    /**
     * {@inheritdoc}
     */
    public readonly url: string;

    /**
     * {@inheritdoc}
     */
    public readonly method: RequestMethod;

    /**
     * {@inheritdoc}
     */
    public readonly headers: HttpHeadersInterface;

    /**
     * {@inheritdoc}
     */
    public readonly body: unknown | null | undefined;

    public constructor(url: string, method: RequestMethod, headers?: HttpHeadersInterface | null | undefined, body?: unknown | null | undefined) {
        this.url     = url;
        this.method  = method;
        this.headers = headers || new HttpHeaders();
        this.body    = undefined === body ? null : body;
    }

    /**
     * {@inheritdoc}
     */
    public clone(replace: Partial<HttpRequestInterface> = {}): HttpRequestInterface {
        return new HttpRequest(
            undefined !== replace.url ? replace.url : this.url,
            undefined !== replace.method ? replace.method : this.method,
            undefined !== replace.headers ? replace.headers : this.headers,
            undefined !== replace.body ? replace.body : this.body,
        );
    }

}
