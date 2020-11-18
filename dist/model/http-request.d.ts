import { HttpHeadersInterface, HttpRequestInterface, RequestMethod } from '../contract';
export declare class HttpRequest implements HttpRequestInterface {
    private readonly _url;
    private readonly _method;
    private readonly _headers;
    private readonly _body;
    constructor(url: string, method: RequestMethod, headers?: HttpHeadersInterface, body?: any | null);
    /**
     * @inheritdoc
     */
    get url(): string;
    /**
     * @inheritdoc
     */
    get method(): RequestMethod;
    /**
     * @inheritdoc
     */
    get headers(): HttpHeadersInterface;
    /**
     * @inheritdoc
     */
    get body(): any | null;
}
//# sourceMappingURL=http-request.d.ts.map