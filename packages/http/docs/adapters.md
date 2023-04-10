# Write your own HTTP adapter

It is quite trivial to write your own HTTP adapter. All you need to do is to implement `HttpAdapterInterface` interface
and provide it to `HttpClient` constructor, per example:

```typescript
import {
    HttpAdapterInterface,
    HttpClientInterface
} from '@runopencode/http';
import {Observable} from 'rxjs';

export class MyHttpClientAdapter implements HttpAdapterInterface {
    public request<T>(request: HttpRequestInterface, options: HttpRequestOptionsInterface): Observable<HttpResponseInterface<T>> {
        // your implementation
    }
}
```

When implementing `request` method, you should have in mind the following:

- `request` method should return `Observable` of `HttpResponseInterface` instance. Subscription to this observable
  should trigger request execution, not invocation of `request` method.
- Unsubscription from `Observable` should cancel request execution, if request is still in progress.
- Canceling request execution should not emit any errors. If request is canceled, `Observable` should complete without
  emitting any value.
- Subscription to `Observable` should not be shared. Each subscription should trigger request execution.
- `request` method should not throw any exceptions. All errors should be emitted as on of:
    - `HttpError` instance, if error is related to HTTP response (error code 4xx or 5xx).
    - `ClientError` instance, if error is related to HTTP client/network error (no Internet connection).
    - `CORSError` instance, if error is related to CORS policy, assuming that underlying adapter can detect CORS errors.
