export class HttpHandler {
    constructor(interceptor, next) {
        this.interceptor = interceptor;
        this.next = next;
    }
    handle(request) {
        return this.interceptor.intercept(request, this.next);
    }
}
//# sourceMappingURL=http-handler.js.map