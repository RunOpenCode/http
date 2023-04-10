# Library models

All model classes are immutable. If you need to modify them, you should use `clone()` method.

### Request, response and headers

- **Headers** are defined with `HttpHeadersInterface` and default implementation is provided with `HttpHeaders`.
- **Request** is defined with `HttpRequestInterface` and default implementation is provided with `HttpRequest`.
- **Response** is defined with `HttpResponseInterface` and default implementation is provided with `HttpResponse`.

### Errors

- **HttpError** extends `Error` and implements `HttpResponseInterface`. It is thrown when HTTP request is successfully
  sent, but response yielded error status code (4xx or 5xx).
- **ClientError** extends `Error` and is thrown when HTTP request is not successfully sent (no Internet connection,
  etc.).
- **CORSError** extends `Error` and is thrown when HTTP request is not successfully sent due to CORS policy violation.