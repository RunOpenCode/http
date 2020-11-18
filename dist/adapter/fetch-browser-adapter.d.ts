import { Observable } from 'rxjs';
import { HttpAdapterInterface, HttpRequestInterface, HttpResponseInterface } from '../contract';
export declare class FetchBrowserAdapter implements HttpAdapterInterface {
    execute(request: HttpRequestInterface): Observable<HttpResponseInterface>;
    private static transform;
    private static reverse;
}
//# sourceMappingURL=fetch-browser-adapter.d.ts.map