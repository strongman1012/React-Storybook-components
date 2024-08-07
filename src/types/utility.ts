
//eslint-disable-next-line @typescript-eslint/no-explicit-any -- "Any function" is sometimes a definition we need when we don't care about the function
export type AnyFunction = (...args: any[]) => any;

export type Keyable = string | number | symbol;
