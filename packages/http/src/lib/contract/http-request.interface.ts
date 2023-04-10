import { HttpHeadersInterface } from './http-headers.interface';

// eslint-disable-next-line no-shadow
export enum RequestMethod {
    GET     = 'GET',
    POST    = 'POST',
    PUT     = 'PUT',
    DELETE  = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD    = 'HEAD',
    PATCH   = 'PATCH',
}

/**
 * Abstraction of HTTP request.
 */
export interface HttpRequestInterface {

    /**
     * Target URL.
     */
    readonly url: string;

    /**
     * Request method.
     */
    readonly method: RequestMethod;

    /**
     * Request headers.
     */
    readonly headers: HttpHeadersInterface;

    /**
     * Request body.
     */
    readonly body: unknown | null;

    /**
     * Create copy, replacing given properties.
     */
    clone(replace?: Partial<HttpRequestInterface>): HttpRequestInterface;
}
