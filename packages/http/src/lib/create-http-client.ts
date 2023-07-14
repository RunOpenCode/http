import { FetchBrowserAdapter }    from './adapter';
import {
    HttpAdapterInterface,
    HttpClientInterface,
    HttpInterceptor,
}                                 from './contract';
import { HttpClient }             from './http-client';
import { ContentTypeInterceptor } from './interceptor';

/**
 * Create default HTTP client.
 */
export function createHttpClient(): HttpClientInterface;
export function createHttpClient(adapter: HttpAdapterInterface): HttpClientInterface;
export function createHttpClient(interceptors: HttpInterceptor[]): HttpClientInterface;
export function createHttpClient(
    adapter: HttpAdapterInterface | HttpInterceptor[] = new FetchBrowserAdapter(),
    interceptors: HttpInterceptor[]                   = [
        new ContentTypeInterceptor(),
    ],
): HttpClientInterface {
    if (adapter instanceof Array) {
        return new HttpClient(new FetchBrowserAdapter(), adapter);
    }

    return new HttpClient(adapter, interceptors);
}
