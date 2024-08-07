export {}

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: jest.fn().mockReturnValue({}),
});