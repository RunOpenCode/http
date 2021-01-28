import {
    HttpHeadersInterface, HttpResponseInterface,
    RequestMethod,
} from '../contract';

/**
 * HTTP Error is value object containing data about occurred error
 * when executing HTTP request.
 */
export class HttpError extends Error implements HttpResponseInterface<any> {

    private readonly _url: string;

    private readonly _status: number;

    private readonly _method: RequestMethod;

    private readonly _headers: HttpHeadersInterface;

    private readonly _message: string;

    private readonly _content: (() => Promise<any>) | Promise<any>;

    public constructor(
        url: string,
        status: number,
        method: RequestMethod,
        headers: HttpHeadersInterface,
        message: string,
        content: (() => Promise<any>) | Promise<any>,
    ) {
        super();
        this._url     = url;
        this._status  = status;
        this._method  = method;
        this._headers = headers;
        this._message = message;
        this._content = content;

        Object.setPrototypeOf(this, HttpError.prototype);
    }

    /**
     * Get requested url.
     */
    public get url(): string {
        return this._url;
    }

    /**
     * Get status code.
     */
    public get status(): number {
        return this._status;
    }

    /**
     * Get request method.
     */
    public get method(): RequestMethod {
        return this._method;
    }

    /**
     * Get headers.
     */
    public get headers(): HttpHeadersInterface {
        return this._headers;
    }

    /**
     * Get error message.
     */
    public get message(): string {
        return this._message;
    }

    /**
     * @inheritdoc
     */
    public get content(): Promise<any> {
        return this._content instanceof Promise ? this._content : this._content();
    }

    /**
     * @inheritdoc
     */
    public clone(replace?: Partial<HttpError>): HttpError {
        // eslint-disable-next-line no-param-reassign
        replace = replace || {};

        return new HttpError(
            undefined !== replace.url ? replace.url : this._url,
            undefined !== replace.status ? replace.status : this._status,
            undefined !== replace.method ? replace.method : this._method,
            undefined !== replace.headers ? replace.headers : this._headers,
            undefined !== replace.message ? replace.message : this._message,
            undefined !== replace.content ? replace.content : this._content,
        );
    }

}
