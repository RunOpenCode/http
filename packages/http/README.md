# @runopencode/http

This library is abstraction of the HTTP client for JavaScript/TypeScript supporting observables from RxJS. Library is
inspired by Angular's HTTP service with a goal to provide framework-agnostic HTTP client which can be used outside
Angular ecosystem.

However, library is not perfect, it is intended to cover the vast majority of use cases, GET, POST, PATCH, DELETE...
requests, commonly used for REST and REST-like APIs. However, edge cases might occur which are not covered by this
library. For those, PRs are welcome.

## Features

- Abstraction of HTTP client for JavaScript/TypeScript supporting observables from RxJS and promises
  through `Observable.toPromise()` method.
- Support for GET, POST, PATCH, DELETE, as well as any other HTTP method via `request` method.
- Support for request and response interceptors.
- Error model based on `Error` class with support for `instanceof` operator.
- Support for request cancellation via unsubscription from observable.
- Easily extensible with custom adapters.
- API similar to Angular's HTTP client.
- Available list of all known HTTP status codes via `HttpStatusCode` enum.

## Motivation

Angular's HTTP client is excellent, but it is tightly coupled with Angular framework. This library provides similar
functionality, but it is framework-agnostic. As consequence, you can achieve following goals:

- Have similar API for HTTP client in Angular and non-Angular projects.
- Have less coupled code with Angular framework, which is considered as one of the most volatile frameworks in
  JavaScript ecosystem. Switching from Angular to React, Vue or any other framework should be easier.
- Develop framework-agnostic libraries and components which can be used in Angular and non-Angular projects as well.
  When those libraries/components are used in Angular project, HTTP client can be provided by Angular's DI and all
  requests within libraries/components will be intercepted by project interceptors as well.
- Replace HTTP request adapter in Angular project with custom one, statically or dynamically.

### Examples

This library was actually created to solve two problems which we had in our projects:

#### Cordova/Capacitor/Ionic HTTP client

When we used **Cordova/Capacitor** + **Ionic** + **Angular** for developing mobile apps, we wanted to use native HTTP
client for better performance and to avoid CORS issues (see
[https://github.com/silkimen/cordova-plugin-advanced-http](https://github.com/silkimen/cordova-plugin-advanced-http)
and [https://capacitorjs.com/docs/apis/http](https://capacitorjs.com/docs/apis/http)). It was very convenient to use
browser on desktop for development and testing, but it was impossible to use native HTTP client of mobile device.
Capacitor solves this problem, by patching `window.fetch` method, however, observables from RxJS are not supported. So
we developed this library and adapter for browser which uses Angular's HTTP client and adapter for native HTTP client.
Since we used Angular, when wiring library into DI, we would detect device type and depending on it, either native HTTP
client of mobile device is used, or Angular's HTTP client. Having API very similar to Angular's HTTP client, our
developers did not have to learn anything new.

#### Web components with HTTP client

We were using StencilJS [https://stenciljs.com](https://stenciljs.com) for development of web components. Those
components were used in standard, server-side rendered web pages, but also in Angular projects. When those components
are used in Angular projects they needed to use same HTTP client which is provided by Angular's DI, with all
interceptors used within project. This was impossible to achieve with Angular's HTTP client, because it is tightly
coupled with Angular framework. However, with this library, it was possible to achieve this goal.

## Available adapters/integrations:

- Native in-browser `fetch` adapter, which is used by default and delivered with this library.
- Angular's HTTP adapter, which is provided as standalone package `@runopencode/ngx-http-client`. Package exposes
  Angular module as well for easy integration into Angular project.

## Learn more:

- [How to install, configure and use library](docs/installation.md)
- [How to write custom interceptor](docs/interceptors.md)
- [Asserting responses](docs/asserting-responses.md)
- [Library models](docs/models.md)

### External resources

- [Learn about Angular's HTTP client](https://angular.io/guide/http), which is inspiration for this library and its
  API.
- [Learn about RxJS](https://rxjs-dev.firebaseapp.com/guide/overview), which is used for observables.

## TODO:

- [ ] Add shortcuts for other HTTP request methods.
- [ ] Write an adapter for: https://github.com/silkimen/cordova-plugin-advanced-http.
- [ ] Write unit tests.
