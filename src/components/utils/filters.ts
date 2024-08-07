
/**
 * Creates a typescript guard for nullable values. 
 * @param item Some item to check
 * @returns A guarantee the item is not null.
 */
export function noNullables<T>(item: T): item is NonNullable<T> {
    return item != null;
}
