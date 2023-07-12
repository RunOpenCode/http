import { HttpClient as AngularHttpClient } from '@angular/common/http';
import {
    InjectionToken,
    Provider,
    Type
} from '@angular/core';
import {
    ContentTypeInterceptor,
    FetchBrowserAdapter,
    HttpAdapterInterface,
    HttpInterceptorFunction,
    HttpInterceptorInterface,
} from '@runopencode/http';
import { AngularHttpAdapter } from './adapter';
import {
    NGX_HTTP_CLIENT_ADAPTER,
    NGX_HTTP_CLIENT_INTERCEPTOR
} from './contract';

export interface Configuration {

    /**
     * Angular adapter is deprecated and will be removed in the next major version.
     */
    adapter: 'angular' | 'fetch' | Type<unknown> | InjectionToken<HttpAdapterInterface>;

    /**
     * Which interceptors should be used.
     */
    interceptors: Array<Type<HttpInterceptorInterface> | HttpInterceptorFunction>;

    /**
     * Register the content type interceptor.
     */
    guessContentType: boolean;
}

export function sanitize(configuration?: Partial<Configuration>): Configuration {
    return {
        adapter: configuration?.adapter ?? 'fetch',
        interceptors: configuration?.interceptors ?? [],
        guessContentType: configuration?.guessContentType ?? true,
    };
}

export function provideAdapter(adapter: 'angular' | 'fetch' | Type<unknown> | InjectionToken<HttpAdapterInterface>): Provider {
    if ('angular' === adapter) {
        return {
            provide: NGX_HTTP_CLIENT_ADAPTER,
            deps: [AngularHttpClient],
            useFactory: function provideAngularHttpAdapter(client: AngularHttpClient): HttpAdapterInterface {
                return new AngularHttpAdapter(client);
            },
        };
    }

    if ('fetch' === adapter) {
        return {
            provide: NGX_HTTP_CLIENT_ADAPTER,
            useFactory: function provideFetchHttpAdapter(): HttpAdapterInterface {
                return new FetchBrowserAdapter();
            },
        };
    }

    return {
        provide: NGX_HTTP_CLIENT_ADAPTER,
        useExisting: adapter,
    };
}

export function provideInterceptors(interceptors: Array<Type<HttpInterceptorInterface> | HttpInterceptorFunction>, includeContentTypeInterceptor: boolean): Provider[] {
    let resolved: Provider[] = [];

    if (includeContentTypeInterceptor) {
        resolved.push({
            provide: NGX_HTTP_CLIENT_INTERCEPTOR,
            useClass: ContentTypeInterceptor,
            multi: true,
        });
    }
    
    return resolved.concat(interceptors.map((interceptor: Type<HttpInterceptorInterface> | HttpInterceptorFunction): Provider => {
        // If interceptor is a class, check if it implements the interface.
        if ('function' === typeof interceptor.prototype.intercept) {
            return {
                provide:  NGX_HTTP_CLIENT_INTERCEPTOR,
                useClass: interceptor as Type<HttpInterceptorInterface>,
                multi:    true,
            };
        }
        
        // It is a function, so we can just pass it as value.
        return {
            provide: NGX_HTTP_CLIENT_INTERCEPTOR,
            useValue: interceptor,
            multi: true,
        };
    }));
}
