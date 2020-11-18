import {
    HttpHeadersInterface,
    RequestMethod,
} from '../contract';

/**
 * HTTP Error is value object containing data about occurred error
 * when executing HTTP request.
 */
export class HttpError extends Error {

    private readonly _url: string;

    private readonly _status: number;

    private readonly _method: RequestMethod;

    private readonly _headers: HttpHeadersInterface;

    private readonly _message: string;

    private readonly _body: any | null;

    private _json: any;

    public constructor(
        url: string,
        status: number,
        method: RequestMethod,
        headers: HttpHeadersInterface,
        message: string,
        body: any | null,
    ) {
        super();
        this._url     = url;
        this._status  = status;
        this._method  = method;
        this._headers = headers;
        this._message = message;
        this._body    = body;

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
     * Get response body (if any).
     */
    public get body(): any {
        return this._body;
    }

    /**
     * Get response content as JSON object.
     */
    public get json(): Promise<any | null> {

        return new Promise<any | null>((resolve: (result: any | null) => void, reject: () => void): void => {
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
            } catch (e) {
                reject();
            }
        });
    }

}
