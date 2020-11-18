import { HttpHeadersInterface, HttpResponseInterface } from '../contract';
/**
 * HTTP Response is value object containing data received from
 * server when executing HTTP request.
 */
export declare class HttpResponse implements HttpResponseInterface {
    private readonly _url;
    private readonly _status;
    private readonly _headers;
    private readonly _body;
    private _json;
    constructor(url: string, status: number, body: string | null, headers: HttpHeadersInterface);
    /**
     * @inheritdoc
     */
    get url(): string;
    /**
     * @inheritdoc
     */
    get status(): number;
    /**
     * @inheritdoc
     */
    get headers(): HttpHeadersInterface;
    get body(): any | null;
    /**
     * @inheritdoc
     */
    get text(): Promise<string | null>;
    /**
     * @inheritdoc
     */
    get json(): Promise<any | null>;
}
//# sourceMappingURL=http-response.d.ts.map