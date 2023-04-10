import { HttpHeadersInterface } from '../contract';

/**
 * HTTP request headers.
 */
export class HttpHeaders implements HttpHeadersInterface {

    private readonly _headers: Map<string, string[]> = new Map<string, string[]>();

    private readonly _normalizedNames: Map<string, string> = new Map<string, string>();

    public constructor(headers?: { [name: string]: string | string[] } | Map<string, string[]>) {

        if (!headers) {
            return;
        }

        if ('function' === typeof headers.forEach) {
            headers.forEach((values: string[] | string, name: string): void => {
                this._headers.set(name, Array.isArray(values) ? values : [values]);
                this._normalizedNames.set(name.toLowerCase(), name);
            });

            return;
        }

        Object.keys(headers).forEach((name: string): void => {
            let values: string[] = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
            let lcName: string   = name.toLowerCase();

            this._headers.set(name, values);
            this._normalizedNames.set(lcName, name);
        });
    }

    public forEach(fn: (values: string[], name: string | undefined, headers: Map<string, string[]>) => void): void {
        this._headers.forEach(
            (values: string[], lcName: string) => fn(values, this._normalizedNames.get(lcName), this._headers),
        );
    }

    /**
     * {@inheritdoc}
     */
    public keys(): string[] {
        return Array.from(this._normalizedNames.values());
    }

    /**
     * {@inheritdoc}
     */
    public has(name: string): boolean {
        return this._normalizedNames.has(name.toLowerCase());
    }

    /**
     * {@inheritdoc}
     */
    public get(name: string): string | null {
        let values: string[] = this.getAll(name);

        if (values === null) {
            return null;
        }

        return values.length > 0 ? values[0] : null;
    }

    /**
     * {@inheritdoc}
     */
    public getAll(name: string): string[] | null {
        return this.has(name) ? this._headers.get(this._normalizedNames.get(name.toLowerCase())) : null;
    }

    /**
     * {@inheritdoc}
     */
    public append(name: string, value: string | string[]): HttpHeadersInterface {
        let headers: Map<string, string[]> = this.all();
        let resolvedName: string           = name;

        if (this._normalizedNames.has(name.toLowerCase())) {
            resolvedName = this._normalizedNames.get(name.toLowerCase());
        }

        let resolvedValues: string[] = headers.has(resolvedName) ? headers.get(resolvedName) : [];
        let valuesToAppend: string[] = Array.isArray(value) ? value : [value];

        valuesToAppend.forEach((valueToAppend: string): void => {
            resolvedValues.push(valueToAppend);
        });

        headers.set(resolvedName, resolvedValues);

        return new HttpHeaders(headers);
    }

    /**
     * {@inheritdoc}
     */
    public set(name: string, value: string | string[]): HttpHeadersInterface {
        let headers: Map<string, string[]> = this.all();
        let resolvedName: string           = name;

        if (this._normalizedNames.has(name.toLowerCase())) {
            resolvedName = this._normalizedNames.get(name.toLowerCase());
        }

        headers.set(resolvedName, Array.isArray(value) ? value : [value]);

        return new HttpHeaders(headers);
    }

    /**
     * {@inheritdoc}
     */
    public delete(name: string, value?: string | string[]): HttpHeadersInterface {
        let headers: Map<string, string[]> = this.all();
        let resolvedName: string           = name;

        if (this._normalizedNames.has(name.toLowerCase())) {
            resolvedName = this._normalizedNames.get(name.toLowerCase());
        }

        if (!headers.has(resolvedName)) {
            return new HttpHeaders(headers);
        }

        if (undefined === value) {
            headers.delete(resolvedName);
            return new HttpHeaders(headers);
        }

        let valuesToRemove: string[] = Array.isArray(value) ? value : [value];
        let values: string[]         = headers.get(resolvedName);

        values = values.filter((currentValue: string): boolean => -1 === valuesToRemove.indexOf(currentValue));

        if (0 === values.length) {
            headers.delete(resolvedName);
            return new HttpHeaders(headers);
        }

        headers.set(resolvedName, values);

        return new HttpHeaders(headers);
    }

    /**
     * {@inheritdoc}
     */
    private all(): Map<string, string[]> {
        let headers: Map<string, string[]> = new Map<string, string[]>();

        this._headers.forEach((headerValues: string[], headerName: string) => {
            headers.set(headerName, [...headerValues]);
        });

        return new Map<string, string[]>(headers);
    }

}
