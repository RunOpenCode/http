import { InjectionToken } from '@angular/core';
import {
    HttpAdapterInterface,
    HttpClientInterface,
    HttpInterceptorInterface,
}                         from '@runopencode/http';

/**
 * Token for providing interceptors.
 */
export const NGX_HTTP_CLIENT_INTERCEPTOR: InjectionToken<HttpInterceptorInterface> = new InjectionToken<HttpInterceptorInterface>('NGX_HTTP_CLIENT_INTERCEPTOR');

/**
 * Token for providing adapter.
 */
export const NGX_HTTP_CLIENT_ADAPTER: InjectionToken<HttpAdapterInterface> = new InjectionToken<HttpAdapterInterface>('NGX_HTTP_CLIENT_ADAPTER');

/**
 * Token for providing http client.
 */
export const NGX_HTTP_CLIENT: InjectionToken<HttpClientInterface> = new InjectionToken<HttpClientInterface>('NGX_HTTP_CLIENT');
