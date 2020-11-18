import {
    HttpHeadersInterface,
    HttpResponseInterface,
} from '../contract';

/**
 * HTTP Response is value object containing data received from
 * server when executing HTTP request.
 */
export class HttpResponse implements HttpResponseInterface {

    private readonly _url: string;

    private readonly _status: number;

    private readonly _headers: HttpHeadersInterface;

    private readonly _body: string | null;

    private _json: any | null;

    public constructor(
        url: string,
        status: number,
        body: string | null,
        headers: HttpHeadersInterface,
    ) {
        this._url     = url;
        this._status  = status;
        this._headers = headers;
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
    public get status(): number {
        return this._status;
    }

    /**
     * @inheritdoc
     */
    public get headers(): HttpHeadersInterface {
        return this._headers;
    }

    public get body(): any | null {
        return this._body;
    }

    /**
     * @inheritdoc
     */
    public get text(): Promise<string | null> {
        return Promise.resolve(this._body);
    }

    /**
     * @inheritdoc
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
