
/**
 * Check if key is in object
 * @param object object
 * @param key potential key of object
 * @returns typescript guard, true if key is in object
 */
export function isKeyOf<T extends object>(object: T, key: unknown): key is keyof T {
    return `${key}` in object;
}
