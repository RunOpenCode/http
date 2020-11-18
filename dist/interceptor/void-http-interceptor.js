/**
 * Default void implementation, allowing us to use interceptors at all.
 *
 * It does not modifies anything, just passes result down to next handler.
 */
export class VoidHttpInterceptor {
    /**
     * @inheritdoc
     */
    intercept(request, next) {
        return next.handle(request);
    }
}
//# sourceMappingURL=void-http-interceptor.js.map