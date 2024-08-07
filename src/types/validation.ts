export type ValidationItem<T = unknown> = {
    errorText: string | ((value: T) => string),
    verify: (value: T) => boolean
}
