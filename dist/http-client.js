import { RequestMethod, } from './contract';
import { HttpHandler, HttpRequestExecutor, } from './handler';
import { VoidHttpInterceptor } from './interceptor';
import { HttpRequest } from './model';
export class HttpClient {
    constructor(adapter, interceptors = []) {
        this._interceptors = interceptors;
        this._adapter = adapter;
    }
    /**
     * @inheritdoc
     */
    get(url, headers) {
        let request = new HttpRequest(url, RequestMethod.GET, headers);
        return this.request(request);
    }
    /**
     * @inheritdoc
     */
    patch(url, data, headers) {
        let request = new HttpRequest(url, RequestMethod.PATCH, headers, data);
        return this.request(request);
    }
    /**
     * @inheritdoc
     */
    post(url, data, headers) {
        let request = new HttpRequest(url, RequestMethod.POST, headers, data);
        return this.request(request);
    }
    /**
     * @inheritdoc
     */
    // eslint-disable-next-line consistent-return
    request(request) {
        // there are no interceptors
        if (0 === this._interceptors.length) {
            return this._adapter.execute(request);
        }
        // there is no need to iterate trough interceptors, we have only one, and it is dummy interceptor.
        if (1 === this._interceptors.length && this._interceptors[0] instanceof VoidHttpInterceptor) {
            return this._adapter.execute(request);
        }
        let previous = new HttpRequestExecutor((req) => this._adapter.execute(req));
        for (let i = this._interceptors.length - 1; i >= 0; i--) {
            let handler = new HttpHandler(this._interceptors[i], previous);
            previous = handler;
            if (0 === i) {
                return handler.handle(request);
            }
        }
    }
}
//# sourceMappingURL=http-client.js.map