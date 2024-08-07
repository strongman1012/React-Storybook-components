

export function logErrorOnNull<T>(item: T, fallback: NonNullable<T>, errorMessage?: string, loggingFunction?: typeof console.error): NonNullable<T> {
    const error = loggingFunction ?? console.error;

    if (item == null) {
        error(errorMessage ?? `Item was null! Using fallback value`);
        return fallback;
    } {
        return item;
    }
}