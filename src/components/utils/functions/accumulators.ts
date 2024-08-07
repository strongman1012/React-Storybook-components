import { Keyable } from "../../../types/utility";

type StringKeyedObject<T> = { [key: string]: ValueOf<T> }
type ValueOf<T> = T[keyof T];

/**
 * Flattens an array by one level.
 * @param acc An array of type T
 * @param cv An array of type T
 * @returns An array of type T
 */
export function toFlat1<T>(acc: T[], cv: T[] | T): T[] {
    if (Array.isArray(cv))
        return [...acc, ...cv];
    return [...acc, cv];
}
/**
 * Reduce an array of simple type T to only unique values
 * @param acc 
 * @param cv 
 * @returns 
 */
export function toUnique<T>(acc: T[], cv: T): T[] {
    if (acc.includes(cv))
        return acc;
    else
        return acc.concat([cv]);
}

/**
 * Reduce an array of complex type T values to only unique values
 * by using a provided areEqual function.
 * 
 * Uses {@link Array.some} internally, so could be slower on exceptionally large arrays.
 * 
 * @param areEqual A function to determine if, given two type T objects, they are equal or not
 * @returns A function which can be used in {@Link Array.reduce} to reduce an array to unique values
 */
export function toUniqueBy<T>(areEqual: (t1: T, t2: T) => boolean) {
    return (acc: T[], cv: T): T[] => {
        if (acc.some(t1 => areEqual(t1, cv))) {
            return acc;
        } else {
            return acc.concat([cv]);
        }
    }
}

/**
 * Create a function to be used in {@link Array.reduce} to
 * create a new {@link Map}, based off of the provided index.
 * 
 * For example, with a data type {testId:0,testVal: 'a'};
 * and an array like:
 * const arr = [{testId:0,testVal: 'a'}];
 * 
 * then
 * 
 * const newMap = arr.reduce(toMap('testId'), new Map());
 * 
 * then the following will be true:
 * 
 * const val = newMap.get(0); // {testId:0,testVal: 'a'};
 * 
 * @param indexKey The attribute to use as the key / index
 * @returns An accumulator function for {@link Array}.reduce
 */
export function toMap<T, K extends keyof T>(indexKey: K): (acc: Map<T[K], T>, cv: T) => Map<T[K], T> {
    return (acc: Map<T[K], T>, cv: T) => {
        const indexVal = cv[indexKey];
        acc.set(indexVal, cv);
        return acc;
    }
}

/**
 * Create a function to be used in {@link Array.reduce} to
 * create a new {@link Map}, based off of the provided index,
 * then apply a function on each element(similar to 
 * {@link Array.map}).
 * 
 * Reduction and transformation at the same time
 * 
 * For example, with a data type {testId:0,testVal: 'a'};
 * and an array like:
 * const arr = [{testId:0,testVal: 'a'}];
 * 
 * then
 * 
 * const newMap = arr.reduce(toMap('testId', (item) => `${item.testVal}${item.testId}`), new Map());
 * 
 * then the following will be true:
 * 
 * const val = newMap.get(0); // "a0";
 * 
 * @param indexKey The attribute to use as the key / index
 * @returns An accumulator function for {@link Array}.reduce
 */
export function toMapTransform<T, K extends keyof T, F>(indexKey: K, transformation: (item: T) => F): (acc: Map<T[K], F>, cv: T) => Map<T[K], F> {
    return (acc: Map<T[K], F>, cv: T) => {
        const indexVal = cv[indexKey];
        acc.set(indexVal, transformation(cv));
        return acc;
    }
}

/**
 * Do the same as {@link toMap} but instead of 1:1 it's 1:many.
 * 
 * Example:
 * ```typescript
 * const arr = [{id:0,test:'a'},{id:0,test:'b'},{id:1,test:'c'}];
 * const normalMap = arr.reduce(toMap('id'), new Map()); // MAP - [[0, {id:0,test:'b'}],[1, {id:1,test:'c'}]]
 * const stackedMap = arr.reduce(toMapStacked('id'), new Map()); // MAP - [[0, [{id:0,test:'a'},{id:0,test:'b'}]],[1,[{id:1,test:'c'}]]]
 * const id0Normal = normalMap.get(0) // {id:0,test:'b'};
 * const id0Stack = stackedMap.get(0) // [{id:0, test:'a'}, {id:0, test:'b'}]
 * ```
 */
export function toMapStacked<T, K extends keyof T>(indexKey: K): (acc: Map<T[K], T[]>, cv: T) => Map<T[K], T[]> {
    return (acc: Map<T[K], T[]>, cv: T) => {
        const indexVal = cv[indexKey];
        if (acc.get(indexVal) == null)
            acc.set(indexVal, []);
        (acc.get(indexVal) as Array<T>).push(cv);
        return acc;
    }
}

/**
 * Do the same as {@link toMapTransform} but instead of 1:1 it's 1:many. 
 * 
 * Reduction and transformation at the same time.
 * 
 * Example:
 * ```typescript
 * const arr = [{id:0,test:'a'},{id:0,test:'b'},{id:1,test:'c'}];
 * const normalMap = arr.reduce(toMapTransform('id', (item) => `${item.testVal}${item.testId}`), new Map()); // MAP - [[0, "b0"],[1, "c1"]]
 * const stackedMap = arr.reduce(toMapStackedTransform('id', (item) => `${item.testVal}${item.testId}`), new Map()); // MAP - [[0, ["a0","b0"]],[1,["c1"]]]
 * const id0Normal = normalMap.get(0) // "b0";
 * const id0Stack = stackedMap.get(0) // ["a0","b0"]
 * ```
 */
export function toMapStackedTransform<T, K extends keyof T, F>(indexKey: K, transformation: (item: T) => F): (acc: Map<T[K], F[]>, cv: T) => Map<T[K], F[]> {
    return (acc: Map<T[K], F[]>, cv: T) => {
        const indexVal = cv[indexKey];
        if (acc.get(indexVal) == null)
            acc.set(indexVal, []);
        (acc.get(indexVal) as Array<F>).push(transformation(cv));
        return acc;
    }
}

type NormalReducer<C, A> = (accumulator: A, currentValue: C) => A;

//Example use
// const [testSum, testString, testMultiply, obj, greatrOrLess10] = [1, 2, 3, 4, 5, 6].reduce(multiReduce<number, number, string, number, { [key: string]: number }, boolean[]>(
//     (acc, cv) => acc + cv,
//     (acc, cv) => acc + `${cv}`,
//     (product, cv) => product * cv,
//     (objItem, cv) => ({ ...objItem, [`${cv}`]: cv }),
//     (boolArr, cv) => ([...boolArr, cv > 10])
// ), [0, '', 1, {}, []]);

//2 reducers
export function multiReduce<T, A1, A2>(reducerA: NormalReducer<T, A1>, reducerB: NormalReducer<T, A2>): (accumulator: [A1, A2], currentValue: T) => [A1, A2];
//3 reducers
export function multiReduce<T, A1, A2, A3>(...reducers: [NormalReducer<T, A1>, NormalReducer<T, A2>, NormalReducer<T, A3>]): (accumulator: [A1, A2, A3], currentValue: T) => [A1, A2, A3];
//4 reducers
export function multiReduce<T, A1, A2, A3, A4>(...reducers: [NormalReducer<T, A1>, NormalReducer<T, A2>, NormalReducer<T, A3>, NormalReducer<T, A4>]): (accumulator: [A1, A2, A3, A4], currentValue: T) => [A1, A2, A3, A4];
//5 reducers
export function multiReduce<T, A1, A2, A3, A4, A5>(...reducers: [NormalReducer<T, A1>, NormalReducer<T, A2>, NormalReducer<T, A3>, NormalReducer<T, A4>, NormalReducer<T, A5>]): (accumulator: [A1, A2, A3, A4, A5], currentValue: T) => [A1, A2, A3, A4, A5];
//6 reducers
export function multiReduce<T, A1, A2, A3, A4, A5, A6>(...reducers: [NormalReducer<T, A1>, NormalReducer<T, A2>, NormalReducer<T, A3>, NormalReducer<T, A4>, NormalReducer<T, A5>, NormalReducer<T, A6>]): (accumulator: [A1, A2, A3, A4, A5, A6], currentValue: T) => [A1, A2, A3, A4, A5, A6];
//7 reducers
export function multiReduce<T, A1, A2, A3, A4, A5, A6, A7>(...reducers: [NormalReducer<T, A1>, NormalReducer<T, A2>, NormalReducer<T, A3>, NormalReducer<T, A4>, NormalReducer<T, A5>, NormalReducer<T, A6>, NormalReducer<T, A7>]): (accumulator: [A1, A2, A3, A4, A5, A6, A7], currentValue: T) => [A1, A2, A3, A4, A5, A6, A7];
//8 reducers
export function multiReduce<T, A1, A2, A3, A4, A5, A6, A7, A8>(...reducers: [NormalReducer<T, A1>, NormalReducer<T, A2>, NormalReducer<T, A3>, NormalReducer<T, A4>, NormalReducer<T, A5>, NormalReducer<T, A6>, NormalReducer<T, A7>, NormalReducer<T, A8>]): (accumulator: [A1, A2, A3, A4, A5, A6, A7, A8], currentValue: T) => [A1, A2, A3, A4, A5, A6, A7, A8];
//9 reducers
export function multiReduce<T, A1, A2, A3, A4, A5, A6, A7, A8, A9>(...reducers: [NormalReducer<T, A1>, NormalReducer<T, A2>, NormalReducer<T, A3>, NormalReducer<T, A4>, NormalReducer<T, A5>, NormalReducer<T, A6>, NormalReducer<T, A7>, NormalReducer<T, A8>, NormalReducer<T, A9>]): (accumulator: [A1, A2, A3, A4, A5, A6, A7, A8, A9], currentValue: T) => [A1, A2, A3, A4, A5, A6, A7, A8, A9];
//4 reducers
export function multiReduce<T, A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>(...reducers: [NormalReducer<T, A1>, NormalReducer<T, A2>, NormalReducer<T, A3>, NormalReducer<T, A4>, NormalReducer<T, A5>, NormalReducer<T, A6>, NormalReducer<T, A7>, NormalReducer<T, A8>, NormalReducer<T, A9>, NormalReducer<T, A10>]): (accumulator: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10], currentValue: T) => [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10];


/**
 * Similar to {@link pipe}, perform multiple reductions in one pass.
 * 
 * For example, say we want to add all values together, in an array, while also counting
 * the max and min. This can easily be done using a for loop, but that doesn't follow a functional
 * style. Using multiReduce, you can do all 3 at once like so:
 * 
 * ```typescript
 * const myArray = [0,3,6,1,2,554,2,-4,2,64,8,4,7];
 * const [sum, max, min] = myArray.reduce(multiReduce(
 *   //Sum
 *   (previousVal, currentVal) => previousVal + currentVal,
 *   //Max
 *   (previousVal, currentVal) => Math.max(previousVal, currentVal),
 *   //Min
 *   (previousVal, currentVal) => Math.min(previousVal, currentVal)
 * ), [
 *   0,
 *   myArray[0],
 *   myArray[0]
 * ]);
 * ```
 * will result in `[649, 554, -4]` after doing one pass. The following code is a for loop impl.
 * 
 * ```typescript
 * const myArray = [0,3,6,1,2,554,2,-4,2,64,8,4,7];
 * let sum = 0;
 * let min = myArray[0];
 * let max = myArray[0];
 * for(let i = 0; i < myArray.length; i++) {
 *     const currentValue = myArray[i];
 *     //sum
 *     sum = sum + currentValue;
 *     //max
 *     max = Math.max(max, currentValue);
 *     //min
 *     min = Math.min(min, currentValue);
 * }
 * //649, 554, -4
 * ```
 * 
 * @param reducers Reducers to use
 * @returns A reducer function
 */// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function multiReduce<T, A>(...reducers: (NormalReducer<T, any>)[]): NormalReducer<T, any> {
    return (acc: A[], cv: T): A[] => {
        return [...reducers.map((rdcr, idx) => rdcr(acc[idx], cv))];
    }
}


export type Squashed<T> = { [key: Keyable]: ValueOf<T>[] };

/*
> test1
{ a: 0, b: '@' }
> test2
{ a: 1, b: '#' }
> test3
{ a: null, b: 0, c: 'test?' }
> [test1,test2,test3].reduce(squash,{});
{ a: [ 0, 1, null ], b: [ '@', '#', 0 ], c: [ 'test?' ] }
*/

//This works I think, types are still wrong tho
export function squash<T extends StringKeyedObject<T>>(acc: Squashed<T>, cv: T): Squashed<T> {
    const newObjToSpread = (Object.keys(cv).reduce((acc1: (Squashed<T>), key: string) => {
        const acum = acc[key];
        const newV = cv[key];
        const returnObj: Squashed<T> = {
            ...acc1,
            [key]: ((acum ?? []) as ValueOf<T>[]).concat([newV])
        };
        return returnObj;
    }, acc));
    const lastObj: Squashed<T> = {
        ...acc,
        ...newObjToSpread
    };
    return lastObj;
}
