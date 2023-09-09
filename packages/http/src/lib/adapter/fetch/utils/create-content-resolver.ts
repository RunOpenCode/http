/**
 * Depending on the type of the response body received from the server,
 * the response content will be resolved with a different method.
 *
 * @internal
 */
export function createContentResolver<T = unknown>(response: Response, type?: 'arraybuffer' | 'blob' | 'json' | 'text'): () => Promise<T> {
    if (204 === response.status) {
        return (): Promise<null> => Promise.resolve(null);
    }

    if ('arraybuffer' === type) {
        return response.arrayBuffer.bind(response);
    }

    if ('blob' === type) {
        return response.blob.bind(response);
    }

    if ('json' === type) {
        return response.json.bind(response);
    }

    if ('text' === type) {
        return response.text.bind(response);
    }

    if (undefined === type && 'application/json' === response.headers.get('Content-Type')) {
        return response.json.bind(response);
    }

    if (undefined === type && ['text/plain', 'text/html', 'text/xml'].includes(response.headers.get('Content-Type'))) {
        return response.text.bind(response);
    }

    throw new Error(`Unsupported type "${type}" provided.`);
}
