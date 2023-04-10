# Asserting responses

When executing HTTP request, you will most probably want to assert response. This library provides small utility
functions for that purpose. Asserting response assumes that you are implementing defensive programming, which will break
your application and expose exception if server response is not as expected.

## Asserting if response is successfully executed

You can assert if response status code is between 200 and 299 by using
`assertResponseIsSuccessful(response: HttpResponseInterface<unknown>): void` function. This function will throw
`HttpError` if response status code is not successful, or do nothing.

## Asserting if response status code is equal to expected status code

You can assert if response status code is equal to expected status code by using
`assertResponseStatusCode(response: HttpResponseInterface<unknown>, code: number): void` function. This function will
throw `HttpError` if response status code is not equal to expected status code, or do nothing.

## Asserting if response satisfies given predicate

There are two signatures for this function, depending on whether `predicate` is async function or not:

- `assertResponseSatisfies(response: HttpResponseInterface<unknown>, predicate: (response: HttpResponseInterface<unknown>) => boolean): void`
- `assertResponseSatisfies(response: HttpResponseInterface<unknown>, predicate: (response: HttpResponseInterface<unknown>) => Promise<boolean>): Promise<void>`

Your predicate function may will determine how your code should look like when asserting response. For example,
if predicate function is synchronous:

```typescript
import { assertResponseSatisfies, HttpResponseInterface } from '@runopencode/http';
import { mySyncPredicate }                                from './my-asserters';
import { get }                                            from './http-client';

let response: HttpResponseInterface<unknown> = await get('https://example.com/api/users');

assertResponseSatisfies(response, mySyncPredicate);
```

or if predicate function is asynchronous:

```typescript
import { assertResponseSatisfies, HttpResponseInterface } from '@runopencode/http';
import { myAsyncPredicate }                               from './my-asserters';
import { get }                                            from './http-client';

let response: HttpResponseInterface<unknown> = await get('https://example.com/api/users');

assertResponseSatisfies(response, myAsyncPredicate);
```

Your predicate should be async only if you are asserting received content.
