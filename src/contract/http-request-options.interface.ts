export interface HttpRequestOptionsInterface {
    /**
     * How to serialize successful response content.
     *
     * Default is "json".
     */
    responseType: 'arraybuffer' | 'blob' | 'json' | 'text';

    /**
     * How to serialize error response content.
     *
     * Default is "json".
     */
    errorType: 'json' | 'text';

    /**
     * Should send credentials with request.
     *
     * Default is FALSE.
     */
    withCredentials?: boolean;
}
