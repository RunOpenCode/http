import { HttpHeadersInterface } from './http-headers.interface';

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
    readonly body: any|null;

    /**
     * Create copy, replacing given properties.
     */
    clone(replace?: Partial<HttpRequestInterface>): HttpRequestInterface;
}

export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
    PATCH = 'PATCH',
}
