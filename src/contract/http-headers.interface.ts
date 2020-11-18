/**
 * HTTP headers, implements immutability.
 */
export interface HttpHeadersInterface {

    /**
     * Returns the names of the headers
     */
    keys(): string[];

    /**
     * Checks for existence of header by given name.
     */
    has(name: string): boolean;

    /**
     * Returns first header that matches given name.
     */
    get(name: string): string | null;

    /**
     * Returns list of header values for a given name.
     */
    getAll(name: string): string[] | null;

    /**
     * Append headers.
     */
    append(name: string, value: string | string[]): HttpHeadersInterface;

    /**
     * Set headers.
     */
    set(name: string, value: string | string[]): HttpHeadersInterface;

    /**
     * Delete headers.
     */
    delete(name: string, value?: string | string[]): HttpHeadersInterface;

    /**
     * Iterate headers.
     */
    forEach(fn: (values: string[], name: string | undefined, headers: Map<string, string[]>) => void): void;
}
