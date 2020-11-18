/**
 * HTTP request headers.
 */
export class HttpHeaders {
    constructor(headers) {
        this._headers = new Map();
        this._normalizedNames = new Map();
        if (!headers) {
            return;
        }
        if (headers.forEach) {
            headers.forEach((values, name) => {
                this._headers.set(name, Array.isArray(values) ? values : [values]);
                this._normalizedNames.set(name.toLowerCase(), name);
            });
            return;
        }
        Object.keys(headers).forEach((name) => {
            let values = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
            let lcName = name.toLowerCase();
            this._headers.set(name, values);
            this._normalizedNames.set(lcName, name);
        });
    }
    forEach(fn) {
        this._headers.forEach((values, lcName) => fn(values, this._normalizedNames.get(lcName), this._headers));
    }
    /**
     * @inheritdoc
     */
    keys() {
        return Array.from(this._normalizedNames.values());
    }
    /**
     * @inheritdoc
     */
    has(name) {
        return this._normalizedNames.has(name.toLowerCase());
    }
    /**
     * @inheritdoc
     */
    get(name) {
        let values = this.getAll(name);
        if (values === null) {
            return null;
        }
        return values.length > 0 ? values[0] : null;
    }
    /**
     * @inheritdoc
     */
    getAll(name) {
        return this.has(name) ? this._headers.get(this._normalizedNames.get(name.toLowerCase())) : null;
    }
    /**
     * @inheritdoc
     */
    append(name, value) {
        let headers = this.all();
        let resolvedName = name;
        if (this._normalizedNames.has(name.toLowerCase())) {
            resolvedName = this._normalizedNames.get(name.toLowerCase());
        }
        let resolvedValues = headers.has(resolvedName) ? headers.get(resolvedName) : [];
        let valuesToAppend = Array.isArray(value) ? value : [value];
        valuesToAppend.forEach((valueToAppend) => {
            resolvedValues.push(valueToAppend);
        });
        headers.set(resolvedName, resolvedValues);
        return new HttpHeaders(headers);
    }
    /**
     * @inheritdoc
     */
    set(name, value) {
        let headers = this.all();
        let resolvedName = name;
        if (this._normalizedNames.has(name.toLowerCase())) {
            resolvedName = this._normalizedNames.get(name.toLowerCase());
        }
        headers.set(resolvedName, Array.isArray(value) ? value : [value]);
        return new HttpHeaders(headers);
    }
    /**
     * @inheritdoc
     */
    delete(name, value) {
        let headers = this.all();
        let resolvedName = name;
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
        let valuesToRemove = Array.isArray(value) ? value : [value];
        let values = headers.get(resolvedName);
        values = values.filter((currentValue) => -1 === valuesToRemove.indexOf(currentValue));
        if (0 === values.length) {
            headers.delete(resolvedName);
            return new HttpHeaders(headers);
        }
        headers.set(resolvedName, values);
        return new HttpHeaders(headers);
    }
    /**
     * @inheritdoc
     */
    all() {
        let headers = new Map();
        this._headers.forEach((headerValues, headerName) => {
            headers.set(headerName, [...headerValues]);
        });
        return new Map(headers);
    }
}
//# sourceMappingURL=http-headers.js.map