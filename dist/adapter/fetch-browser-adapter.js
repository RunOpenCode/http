import { __awaiter } from "tslib";
import { Subject, } from 'rxjs';
import { ClientError, HttpError, } from '../error';
import { HttpHeaders, HttpResponse, } from '../model';
export class FetchBrowserAdapter {
    execute(request) {
        let body = request.body;
        if ('application/json' === request.headers.get('Content-Type') && typeof body === 'object') {
            body = JSON.stringify(request.body);
        }
        let promise = fetch(request.url, {
            method: request.method,
            headers: FetchBrowserAdapter.transform(request.headers),
            body: body,
        });
        let observable = new Subject();
        promise.then((response) => __awaiter(this, void 0, void 0, function* () {
            let data = yield response.text();
            if (response.status >= 200 && response.status < 300) {
                observable.next(new HttpResponse(response.url, response.status, data, new HttpHeaders(FetchBrowserAdapter.reverse(response.headers))));
                observable.complete();
                return;
            }
            observable.error(new HttpError(request.url, response.status, request.method, new HttpHeaders(FetchBrowserAdapter.reverse(response.headers)), response.statusText, data));
            observable.complete();
        }));
        promise.catch((error) => {
            // NOTE: fetch can not detect CORS errors.
            observable.error(new ClientError(request.url, request.method, request.headers, error.message));
            observable.complete();
        });
        return observable.asObservable();
    }
    static transform(headers) {
        let result = {};
        if (!headers) {
            return result;
        }
        let keys = headers.keys();
        keys.forEach((key) => {
            result[key] = headers.getAll(key).join(';');
        });
        return result;
    }
    static reverse(headers) {
        let result = {};
        if (!headers) {
            return result;
        }
        headers.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    }
}
//# sourceMappingURL=fetch-browser-adapter.js.map