import {
    HttpHeadersInterface,
    HttpResponseInterface,
} from '../contract';

/**
 * HTTP Response is value object containing data received from
 * server when executing HTTP request.
 */
export class HttpResponse<T> implements HttpResponseInterface<T> {

    /**
     * {@inheritdoc}
     */
    public readonly url: string;

    /**
     * {@inheritdoc}
     */
    public readonly status: number;

    /**
     * {@inheritdoc}
     */
    public readonly headers: HttpHeadersInterface;

    /**
     * {@inheritdoc}
     */
    public get content(): Promise<T> {
        return this._content instanceof Promise ? this._content : this._content();
    }

    private readonly _content: (() => Promise<T>) | Promise<T>;

    public constructor(
        url: string,
        status: number,
        headers: HttpHeadersInterface,
        content: (() => Promise<T>) | Promise<T>,
    ) {
        this.url      = url;
        this.status   = status;
        this.headers  = headers;
        this._content = content;
    }

    /**
     * {@inheritdoc}
     */
    public clone(replace?: Partial<HttpResponseInterface<T>>): HttpResponseInterface<T> {
        // eslint-disable-next-line no-param-reassign
        replace = replace || {};

        return new HttpResponse<T>(
            undefined !== replace.url ? replace.url : this.url,
            undefined !== replace.status ? replace.status : this.status,
            undefined !== replace.headers ? replace.headers : this.headers,
            undefined !== replace.content ? replace.content : this._content,
        );
    }

}
