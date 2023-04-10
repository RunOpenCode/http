# Installation

Library is available on NPM, so you can install it via NPM or Yarn.

```commandline
npm i --save @runopencode/http
```

You will most probably want to have one single HTTP client instance in your application. Example below shows how to
create such instance, assuming that no dependency injection is being used. If you are using Angular, you can use
`@runopencode/ngx-http-client` package, which provides Angular module for easy integration into Angular project. For any
other framework, you may use code presented below either "as is" or as guideline for your own implementation (with or
without dependency injection).

```typescript
// file http-client.ts
import { 
    HttpClient, 
    HttpClientInterface,
    FetchBrowserAdapter,
    ContentTypeInterceptor,
} from '@runopencode/http';

// you may export this instance, however, it is better to export functions and encapsulate instance inside
const httpClient: HttpClientInterface = new HttpClient(
    new FetchBrowserAdapter(),
    [
        new ContentTypeInterceptor(),   // optional interceptor, which sets Content-Type header
        // ... other interceptors
    ],    
);

// export functions which will be used in your application
export const get = client.get.bind(client);
export const post = client.post.bind(client);
export const patch = client.patch.bind(client);
export const del = client.delete.bind(client);
export const request = client.request.bind(client);
```

Within your application, you can use exposed functions for executing requests, per example:

```typescript
// file app.ts
import {
    HttpError,
    HttpResponseInterface,
}              from '@runopencode/http';
import { get } from './http-client';

type Payload = {
    id: number;
    name: string;
};

get<string>('https://example.com/api/users').subscribe((response: HttpResponseInterface<Payload>): void => {
        // handle response
    }, (error: HttpError): void => {
        // handle error
    },
);
```