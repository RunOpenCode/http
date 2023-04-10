import { HttpClient as AngularHttpClient } from '@angular/common/http';
import {
    InjectionToken,
    Provider,
    Type,
}                                          from '@angular/core';
import {
    FetchBrowserAdapter,
    HttpAdapterInterface,
    ContentTypeInterceptor,
}                                          from '@runopencode/http';
import { AngularHttpAdapter }              from './adapter';
import {
    NGX_HTTP_CLIENT_ADAPTER,
    NGX_HTTP_CLIENT_INTERCEPTOR,
}                                          from './contract';

export interface Configuration {

    adapter: 'angular' | 'fetch' | Type<never> | InjectionToken<HttpAdapterInterface>;

    interceptors: Type<unknown>[];

    guessContentType: boolean;
}

export function sanitize(configuration?: Partial<Configuration>): Configuration {
    return {
        adapter:          configuration?.adapter ?? 'angular',
        interceptors:     configuration?.interceptors ?? [],
        guessContentType: configuration?.guessContentType ?? true,
    };
}

export function provideAdapter(adapter: 'angular' | 'fetch' | Type<never> | InjectionToken<HttpAdapterInterface>): Provider {
    if ('angular' === adapter) {
        return {
            provide:    NGX_HTTP_CLIENT_ADAPTER,
            deps:       [AngularHttpClient],
            useFactory: function provideAngularHttpAdapter(client: AngularHttpClient): HttpAdapterInterface {
                return new AngularHttpAdapter(client);
            },
        };
    }

    if ('fetch' === adapter) {
        return {
            provide:    NGX_HTTP_CLIENT_ADAPTER,
            useFactory: function provideFetchHttpAdapter(): HttpAdapterInterface {
                return new FetchBrowserAdapter();
            },
        };
    }

    return {
        provide:     NGX_HTTP_CLIENT_ADAPTER,
        useExisting: adapter,
    };
}

export function provideInterceptors(interceptors: Type<unknown>[], includeContentTypeInterceptor: boolean): Provider[] {
    return [
        ...(includeContentTypeInterceptor ? [{
            provide:  NGX_HTTP_CLIENT_INTERCEPTOR,
            useClass: ContentTypeInterceptor,
            multi:    true,
        }] : []),
        ...interceptors.map((interceptor: Type<unknown>): Provider => ({
            provide:  NGX_HTTP_CLIENT_INTERCEPTOR,
            useClass: interceptor,
            multi:    true,
        })),
    ];
}
