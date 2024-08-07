import { ValidationItem } from "../../../types/validation";

/**
 * Returns true if a number is in the specified range, including the min and max.
 * @param value Value to check
 * @param minValue min value 
 * @param maxValue max value
 * @returns True, if the value is within the range.
 */
export function valueIsInRange(value: number, minValue: number, maxValue: number) {
    return value >= minValue && value <= maxValue;
}

/**
 * Returns true if a number is in the specified range, excluding the min and max.
 * @param value Value to check
 * @param minValue min value 
 * @param maxValue max value
 * @returns True, if the value is within the range.
 */
export function valueIsInRange_Exclusive(value: number, minValue: number, maxValue: number) {
    return value > minValue && value < maxValue;
}


/**
 * Return a function which checks if a number is within a certain range.
 * {@link valueIsInRange}
 * @param min The min value
 * @param max The max value
 * @returns A function to check if a value is within a specified range.
 */
export function inRange(min: number, max: number): ValidationItem<number> {
    return {
        errorText: `Must be within range [${min}, ${max}]`,
        verify: (value: number) => valueIsInRange(value, min, max)
    };
}

/**
 * Return a function which checks if a number is within a certain range (Exclusive).
 * {@link valueIsInRange}
 * @param min The min value
 * @param max The max value
 * @returns A function to check if a value is within a specified range.
 */
export function inRange_Exclusive(min: number, max: number): ValidationItem<number> {
    return {
        errorText: `Must be within range (${min}, ${max})`,
        verify: (value: number) => valueIsInRange_Exclusive(value, min, max)
    };
}

/**
 * Require the value be greater than or equal to the provided value
 * @param minValue The minimum value to permit
 * @returns A validation item
 */
export function minVal(minValue: number): ValidationItem<number> {
    return {
        errorText: "Must be greater than or equal to " + minValue + ".",
        verify: (value: number) => value >= minValue
    }
}

/**
 * Require the value be greater than the provided value
 * @param minValue The minimum value
 * @returns A validation item
 */
export function greaterThan(minValue: number): ValidationItem<number> {
    return {
        errorText: "Must be greater than " + minValue + ".",
        verify: (value: number) => value > minValue
    }
}

/**
 * Require the value be less than the provided value
 * @param minValue The maximum value
 * @returns A validation item
 */
export function lessThan(maxValue: number): ValidationItem<number> {
    return {
        errorText: "Must be less than " + maxValue + ".",
        verify: (value: number) => value < maxValue
    }
}

/**
 * Require the value be less than or equal to the provided value
 * @param maxValue The max value to permit
 * @returns A validation item
 */
export function maxVal(maxValue: number): ValidationItem<number> {
    return {
        errorText: "Must be less than or equal to " + maxValue + ".",
        verify: (value: number) => value <= maxValue
    }
}

/**
 * Require a (string -> Date) value be before the given date.
 * @param date The date to set as the latest possible date.
 * @returns A validation item
 */
export function dateBefore(date: Date): ValidationItem<string | Date> {
    return {
        errorText: `Date must be before ${date.toDateString()}`,
        verify: (value: string | Date) => {
            let d: Date;
            if (typeof value === 'string') {
                d = new Date(value);
            } else {
                d = value;
            }
            const dateToTest = d;
            return dateToTest.getTime() < date.getTime();
        }
    }
}

/**
 * Require a (string -> Date) value be after the given date.
 * @param date The date to set as the earliest possible date.
 * @returns A validation item
 */
export function dateAfter(date: Date): ValidationItem<string | Date> {
    return {
        errorText: `Date must be after ${date.toDateString()}`,
        verify: (value: string | Date) => {
            let d: Date;
            if (typeof value === 'string') {
                d = new Date(value);
            } else {
                d = value;
            }
            const dateToTest = d;
            return dateToTest.getTime() > date.getTime();
        }
    }
}

/**
 * Require input have no more than the given number of decimal places. 
 * @param decimalPrecision Precision to cap at.
 * @returns A validation item
 */
export function hasPrecisionUpTo(decimalPrecision: number): ValidationItem<number> {
    return {
        errorText: (num: number) => `Max ${decimalPrecision} decimal places. Had (${num.toString().split(".")[1]?.length ?? 0})`,
        verify: (value: number) => {
            const numAsStr = value.toString();
            //Only works for US english
            if (numAsStr.includes(".")) {
                const [, decimalNum] = numAsStr.split(".");
                return decimalNum.length <= decimalPrecision;
            } else {
                return true;
            }
        }
    }
}

/**
 * Require input have no less than the given number of decimal places. 
 * @param decimalPrecision Precision to start at.
 * @returns A validation item
 */
export function hasMinimumPrecisionOf(decimalPrecision: number): ValidationItem<number> {
    return {
        errorText: (num: number) => `Min ${decimalPrecision} decimal places. Had (${num.toString().split(".")[1]?.length ?? 0})`,
        verify: (value: number) => {
            const numAsStr = value.toString();
            //Only works for US english
            if (numAsStr.includes(".")) {
                const [, decimalNum] = numAsStr.split(".");
                return decimalNum.length >= decimalPrecision;
            } else {
                return false;
            }
        }
    }
}

/**
 * Require input have the given number of decimal places. 
 * @param decimalPrecision Precision to be at.
 * @returns A validation item
 */
export function hasExactPrecisionOf(decimalPrecision: number): ValidationItem<number> {
    return {
        errorText: (num: number) => `Requires ${decimalPrecision} decimal places. Had (${num.toString().split(".")[1]?.length ?? 0})`,
        verify: (value: number) => {
            if (decimalPrecision < 0) return true;

            const numAsStr = value.toString();

            //Only works for US english
            if (decimalPrecision === 0) {
                return !numAsStr.includes(".");
            } else {
                if (numAsStr.includes(".")) {
                    const [, decimalNum] = numAsStr.split(".");
                    return decimalNum.length === decimalPrecision;
                } else {
                    return false;
                }
            }
        }
    }
}

export function isNumber(): ValidationItem<number> {
    return {
        errorText: `Must be a valid number`,
        verify: (val: number) => !isNaN(val)
    }
}

export function isEqualTo(num: number): ValidationItem<number> {
    return {
        errorText: `Must be equal to ${num}`,
        verify: (val: number) => val === num
    }
}

export function isInteger(): ValidationItem<number> {
    return {
        errorText: `Must be an integer`,
        verify: (val: number) => Math.floor(val) - val === 0
    }
}

export function isMultipleOf(num: number): ValidationItem<number> {
    return {
        errorText: `Must be a multiple of ${num}`,
        verify: (val: number) => val % num === 0
    }
}
