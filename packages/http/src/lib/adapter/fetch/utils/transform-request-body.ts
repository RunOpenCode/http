import { HttpRequestInterface } from '../../../contract';

/**
 * Analyze request body and transform it to whatever format
 * is suitable.
 *
 * @internal
 */
export function transformRequestBody(request: HttpRequestInterface): BodyInit {
    let body: unknown = request.body;

    if ('application/json' === request.headers.get('Content-Type') && typeof body === 'object') {
        return JSON.stringify(body);
    }

    return body as BodyInit;
}

