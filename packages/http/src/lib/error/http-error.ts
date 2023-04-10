import {
    HttpHeadersInterface,
    HttpResponseInterface,
    RequestMethod,
} from '../contract';

/**
 * HTTP Error is value object containing data about occurred error
 * when executing HTTP request.
 */
export class HttpError extends Error implements HttpResponseInterface<unknown> {

    /**
     * Get requested url.
     */
    public readonly url: string;

    /**
     * Get status code.
     */
    public readonly status: number;

    /**
     * Get request method.
     */
    public readonly method: RequestMethod;

    /**
     * Get headers.
     */
    public readonly headers: HttpHeadersInterface;

    /**
     * {@inheritdoc}
     */
    public get content(): Promise<unknown> {
        return this._content instanceof Promise ? this._content : this._content();
    }

    private readonly _content: (() => Promise<unknown>) | Promise<unknown>;

    public constructor(
        url: string,
        status: number,
        method: RequestMethod,
        headers: HttpHeadersInterface,
        message: string,
        content: (() => Promise<unknown>) | Promise<unknown>,
    ) {
        super(message);
        this.url      = url;
        this.status   = status;
        this.method   = method;
        this.headers  = headers;
        this._content = content;

        Object.setPrototypeOf(this, HttpError.prototype);
    }

    /**
     * {@inheritdoc}
     */
    public clone(replace?: Partial<HttpError>): HttpError {
        // eslint-disable-next-line no-param-reassign
        replace = replace || {};

        return new HttpError(
            undefined !== replace.url ? replace.url : this.url,
            undefined !== replace.status ? replace.status : this.status,
            undefined !== replace.method ? replace.method : this.method,
            undefined !== replace.headers ? replace.headers : this.headers,
            undefined !== replace.message ? replace.message : this.message,
            undefined !== replace.content ? replace.content : this._content,
        );
    }

}
