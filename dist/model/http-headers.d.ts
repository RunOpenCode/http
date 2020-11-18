import { HttpHeadersInterface } from '../contract';
/**
 * HTTP request headers.
 */
export declare class HttpHeaders implements HttpHeadersInterface {
    private readonly _headers;
    private readonly _normalizedNames;
    constructor(headers?: {
        [name: string]: string | string[];
    } | Map<string, string[]>);
    forEach(fn: (values: string[], name: string | undefined, headers: Map<string, string[]>) => void): void;
    /**
     * @inheritdoc
     */
    keys(): string[];
    /**
     * @inheritdoc
     */
    has(name: string): boolean;
    /**
     * @inheritdoc
     */
    get(name: string): string | null;
    /**
     * @inheritdoc
     */
    getAll(name: string): string[] | null;
    /**
     * @inheritdoc
     */
    append(name: string, value: string | string[]): HttpHeadersInterface;
    /**
     * @inheritdoc
     */
    set(name: string, value: string | string[]): HttpHeadersInterface;
    /**
     * @inheritdoc
     */
    delete(name: string, value?: string | string[]): HttpHeadersInterface;
    /**
     * @inheritdoc
     */
    private all;
}
//# sourceMappingURL=http-headers.d.ts.map