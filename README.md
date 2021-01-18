# HTTP 

HTTP is abstraction of HTTP service for API calls from client application 
to server. The very purpose of this implementation is to be used in various
use cases where some interoperability is required.

Per example, it can be used for web components (per example, stenciljs), 
Angular 2+ project, Cordova mobile app. General idea is to use this abstraction
and depending on environment, to choose an adequate HTTP adapter.

You could write a library for web based application and use that library for 
Cordova application as well without changing its code while utilising native 
implementation of HTTP. You could test mobile app in browser and compile it 
for mobile with native HTTP as well and by doing so, increase your productivity.

However, library is not perfect, it is intended to cover the vast majority of 
use cases, GET, POST, PATCH, DELETE... requests, commonly used for REST and
REST-like APIs. However, edge cases might occur which are not covered by this
library. For those, PRs are welcome. 

Library is inspired by Angular's HTTP service, with interceptors implemented
in its core. Async methods are implemented through utilisation of RXJS 
(Observable pattern).

Available adapters:

- Native in-browser fetch adapter.
- Angular's common HTTP adapter.

TODO:

- Write an adapter for: https://github.com/silkimen/cordova-plugin-advanced-http.
- Add support for canceling requests (abort).

