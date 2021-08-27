import {
    HttpHeadersInterface,
    HttpResponseInterface,
} from '../contract';

/**
 * HTTP Response is value object containing data received from
 * server when executing HTTP request.
 */
export class HttpResponse<T> implements HttpResponseInterface<T> {

    private readonly _url: string;

    private readonly _status: number;

    private readonly _headers: HttpHeadersInterface;

    private readonly _content: (() => Promise<T | null>) | Promise<T | null>;

    public constructor(
        url: string,
        status: number,
        headers: HttpHeadersInterface,
        content: (() => Promise<T | null>) | Promise<T | null>,
    ) {
        this._url     = url;
        this._status  = status;
        this._headers = headers;
        this._content = content;
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
    public get status(): number {
        return this._status;
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
    public get content(): Promise<T> {
        return this._content instanceof Promise ? this._content : this._content();
    }

    /**
     * @inheritdoc
     */
    public clone(replace?: Partial<HttpResponseInterface<T>>): HttpResponseInterface<T> {
        // eslint-disable-next-line no-param-reassign
        replace = replace || {};

        return new HttpResponse<T>(
            undefined !== replace.url ? replace.url : this._url,
            undefined !== replace.status ? replace.status : this._status,
            undefined !== replace.headers ? replace.headers : this._headers,
            undefined !== replace.content ? replace.content : this._content,
        );
    }

}
