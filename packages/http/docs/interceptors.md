# Interceptors

Interceptors are a way to intercept requests before they are sent to the server, or when response is received from the
server. This is useful for authentication, logging, or transforming requests before they are sent. Inspiration for
interceptors comes from Angular's HTTP client, read more about
it [here](https://angular.io/guide/http#intercepting-requests-and-responses).

Common tasks which can be done with interceptors:

- **Add authentication headers to requests** - you can use `Authorization` header or any other header which is required
  by your API for every request in one central place.
- **Add `Content-Type` header to requests** based on type of your request body. This library comes
  with `ContentTypeInterceptor` for this purpose, or you can provide your own implementation.
- **Re-issue authentication request** if it has expired when receiving response from the server with 401 status code and
  retry original request. Per example, common duration of JWT token is 15-30 minutes, so it is quite common to have JWT
  token expired when sending request to the server. In this case, you can re-issue authentication request with refresh
  token and retry original request.
- **Add client locale to requests** - via `Accept-Language` header to requests, or query parameter.

Those are just a few examples of what you can do with interceptors.

## Creating interceptors

In order to create interceptor, you need to implement `HttpInterceptorInterface` interface. This interface has only one
method and depending on what you want to intercept (request and response), implement will have different form. Examples
of both types of interceptors are provided below.

Of course, these are just simple examples of what you can do with interceptors, but it will give you an idea of how to
use them in your application successfully.

### Request interceptor

Task of this interceptor is to intercept request before it is sent to the server and add custom header.

```typescript
import {
    HttpInterceptorInterface,
    HttpRequestInterface,
    HttpHandlerInterface,
    HttpResponseInterface,
}                     from '@runopencode/http';
import { Observable } from 'rxjs';

export class RequestInterceptor implements HttpInterceptorInterface {

    public intercept(request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface<T>> {
        let modified: HttpRequestInterface = request.clone({
            headers: request.headers.append('X-My-Header', 'value'),
        });

        return next.handle(modified);
    }
}
```

### Response interceptor

Task of this interceptor is to intercept response from the server and log its content into console.

```typescript
import {
    HttpInterceptorInterface,
    HttpRequestInterface,
    HttpHandlerInterface,
    HttpResponseInterface,
}                     from '@runopencode/http';
import { Observable } from 'rxjs';
import { tap }        from 'rxjs/operators';

export class ResponseInterceptor implements HttpInterceptorInterface {

    public intercept(request: HttpRequestInterface, next: HttpHandlerInterface): Observable<HttpResponseInterface<T>> {
        return next.handle(request).pipe(tap((response: HttpResponseInterface<T>): void => {
            console.log(response.body);
        }));
    }
}
```
