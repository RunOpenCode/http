# @runopencode/ngx-http-client

This library provides Angular module for easy integration of `@runopencode/http` into Angular project. You can read more
about `@runopencode/http` in its [README.md](https://github.com/RunOpenCode/http/blob/master/packages/http/README.md)
file.

## Installation

Library is available on NPM, so you can install it via NPM or Yarn.

```commandline
npm i --save @runopencode/ngx-http-client
```

Within your Angular project, you can import `HttpClientModule` from `@runopencode/ngx-http-client` module and register
it.

```typescript
import { NgxHttpClientModule } from '@runopencode/ngx-http-client';

@NgModule({
    imports: [
        NgxHttpClientModule.forRoot({
            // optional configuration
        }),
    ],
})
export class AppModule {
}
```

Note that `NgxHttpClientModule` should be imported only once in your application with `forRoot` method (usually in your
top application module).

## Configuration

`NgxHttpClientModule.forRoot` method accepts optional configuration object. Configuration object has the following
properties:

- `adapter`, default value is `angular` - by default, Angular's `HttpClient` is used as HTTP adapter. However, you may
  choose to use `fetch` adapter instead, or any other adapter which implements `HttpAdapterInterface`
  from `@runopencode/http` package. If you want to use `fetch` adapter, you should pass `fetch` as value for this
  configuration parameter. Otherwise, you may register your adapter within Angular's DI container and pass its
  name/injection token as a value.
- `interceptors`, default value is empty array - you may create your own interceptors and register them here.
  Interceptors must be decorated with `@Injectable` decorator and must implement `HttpInterceptorInterface` from
  `@runopencode/http` package. For each provided interceptor, module will register it within Angular's DI container.
- `guessContentType`, default value is `true` - when set to `true`, `ContentTypeInterceptor` from `@runopencode/http`
  package will be registered as interceptor automaticaly. This interceptor will set `Content-Type` header based on
  request body.

## Available injection tokens

- `NGX_HTTP_CLIENT` - injection token for HTTP client. You may use this token to inject HTTP client into your classes if
  you want to typehint client using interface instead of concrete implementation.
- `NGX_HTTP_CLIENT_ADAPTER` - injection token for HTTP adapter. Instead of configuring adapter via `adapter`
  configuration parameter, you may register your adapter within Angular's DI container with this injection token to be
  used by HTTP client. However, configuration is preferred way of doing this.
- `NGX_HTTP_CLIENT_INTERCEPTOR` - injection token for HTTP interceptors. Instead of configuring interceptors via
  `interceptors` configuration parameter, you may register your interceptors within Angular's DI container with this
  injection token to be used by HTTP client. Make sure that you register your interceptors as multi-injection
  tokens (`multi: true`).

## How to use

Once you have imported `NgxHttpClientModule` into your application, you can inject `HttpClientInterface` into your
classes and use it to execute HTTP requests.

```typescript
import {
    HttpClientInterface,
    HttpResponseInterface
} from '@runopencode/http';
import {
    Inject,
    Injectable,
} from '@angular/core';

import { NGX_HTTP_CLIENT } from '@runopencode/ngx-http-client';
import { Observable }      from 'rxjs';
import { map }             from 'rxjs/operators';

@Injectable()
export class PostRepository {

    private readonly _client: HttpClientInterface;

    public constructor(@Inject(NGX_HTTP_CLIENT) client: HttpClientInterface) {
        this._client = client;
    }

    public async getPosts(): Observable<Post[]> {
        return this._client.get<PostPayload[]>('https://jsonplaceholder.typicode.com/posts').pipe(map(/* ... */));
    }

}
```
