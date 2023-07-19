import { createContentResolver } from './create-content-resolver';

describe('createContentResolver()', (): void => {

    it('resolves to null when status code is 204.', (): void => {
        expect(createContentResolver<null>({
            status: 204,
        } as Response, 'arraybuffer')()).resolves.toBeNull();
    });

    it.each([
        ['arraybuffer', 'arrayBuffer'],
        ['blob', 'blob'],
        ['json', 'json'],
        ['text', 'text'],
    ])('will resolve to $method() when type is "$method".', (type: 'arraybuffer' | 'blob' | 'json' | 'text', method: string): void => {
        let mockedFunction: jest.Mock = jest.fn();

        createContentResolver<null>({
            [method]: mockedFunction,
        } as unknown as Response, type)();

        expect(mockedFunction).toBeCalled();
    });

    it('throws exception when type is not supported.', (): void => {
        expect((): void => {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            createContentResolver<null>({} as Response, 'foo' as any);
        }).toThrowError('Unsupported type "foo" provided.');
    });

});
