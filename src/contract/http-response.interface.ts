import { HttpStatusCode }       from '../enum';
import { HttpHeadersInterface } from './http-headers.interface';

/**
 * Abstraction of HTTP response.
 */
export interface HttpResponseInterface<T> {

    /**
     * Get final destination URL.
     */
    readonly url: string;

    /**
     * Get response status code.
     */
    readonly status: HttpStatusCode;

    /**
     * Get response headers.
     */
    readonly headers: HttpHeadersInterface;

    /**
     * Get response body.
     */
    readonly body: T | null;

    /**
     * Get response content as text.
     */
    readonly text: Promise<string | null>;

    /**
     * Get response content as JSON object.
     */
    readonly json: Promise<T | null>;
}
