import {
    ModuleWithProviders,
    NgModule,
}                           from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
    HttpAdapterInterface,
    HttpClient,
    HttpClientInterface,
    HttpInterceptorInterface,
    VoidHttpInterceptor,
}                           from '@runopencode/http';
import {
    Configuration,
    provideAdapter,
    provideInterceptors,
    sanitize,
}                           from './configuration';
import {
    NGX_HTTP_CLIENT,
    NGX_HTTP_CLIENT_ADAPTER,
    NGX_HTTP_CLIENT_INTERCEPTOR,
}                           from './contract';

@NgModule({
    imports: [
        HttpClientModule,
    ],
})
export class NgxHttpClientModule {

    public static forRoot(configuration: Partial<Configuration> = {}): ModuleWithProviders<NgxHttpClientModule> {
        let sanitized: Configuration = sanitize(configuration);

        return {
            ngModule:  NgxHttpClientModule,
            providers: [
                {
                    provide:  NGX_HTTP_CLIENT_INTERCEPTOR,
                    useClass: VoidHttpInterceptor,
                    multi:    true,
                },
                {
                    provide:    HttpClient,
                    deps:       [NGX_HTTP_CLIENT_ADAPTER, NGX_HTTP_CLIENT_INTERCEPTOR],
                    useFactory: function provideHttpClient(
                        adapter: HttpAdapterInterface,
                        interceptors: HttpInterceptorInterface[] = [],
                    ): HttpClientInterface {
                        return new HttpClient(
                            adapter,
                            interceptors.filter((interceptor: HttpInterceptorInterface): boolean => !(interceptor instanceof VoidHttpInterceptor)),
                        );
                    },
                },
                {
                    provide:     NGX_HTTP_CLIENT,
                    useExisting: HttpClient,
                },
                provideAdapter(sanitized.adapter),
                provideInterceptors(sanitized.interceptors, sanitized.guessContentType),
            ],
        };
    }

}
