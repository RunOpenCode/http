/**
 * Actually executes http request.
 */
export class HttpRequestExecutor {
    constructor(executor) {
        this.executor = executor;
    }
    handle(request) {
        return this.executor(request);
    }
}
//# sourceMappingURL=http-request-executor.js.map