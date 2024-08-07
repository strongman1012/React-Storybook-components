import { ValidationItem } from "../../../types/validation";

export const NAME_BANNED_CHARACTERS = "?$%;'\\\"`";

/**
 * Verify a string does not contain any character in the given set
 * @param characterList The character set
 * @returns A validation item
 */
export function doesNotContainCharacters(characterList: string): ValidationItem<string> {
    return {
        errorText: `Must not contain the following: ${characterList}`,
        verify: (value: string) => {
            const chars = characterList.split("");
            for (const c of chars) {
                if (value.includes(c))
                    return false;
            }
            return true;
        }
    }
}

type StringNotEmptyOptions = {
    /**
     * Trim the string before checking if empty
     */
    withTrim?: boolean
}
/**
 * Verify a string is not empty
 * @returns A validation item
 */
export function stringNotEmpty(options?: StringNotEmptyOptions): ValidationItem<string> {
    return {
        errorText: "Must not be empty",
        verify: (value: string) => {
            if (options?.withTrim) {
                return value.trim().length > 0
            } else {
                return value.length > 0
            }
        }
    }
}

/**
 * Verify a string has no more than n characters in length.
 * @param maxCharacterCount Max character count
 * @returns A string validation item
 */
export function maxCharacterCountOf(maxCharacterCount: number): ValidationItem<string> {
    return {
        errorText: `Max length of ${maxCharacterCount}`,
        verify: (str: string) => str.length <= maxCharacterCount
    }
}

/**
 * Verify a string has no less than n characters in length.
 * @param minCharacterCount Max character count
 * @returns A string validation item
 */
export function minCharacterCountOf(minCharacterCount: number): ValidationItem<string> {
    return {
        errorText: `Min length of ${minCharacterCount}`,
        verify: (str: string) => str.length >= minCharacterCount
    }
}

/**
 * Collection of regex for date formats
 */
export const DateFormat = {
    MM_DD_YYYY: {
        text: "MM-DD-YYYY",
        regex: /\d\d-\d\d-\d\d\d\d/
    },
    MM_DD_YYYY_SLASHES: {
        text: "MM/DD/YYYY",
        regex: /\d\d\/\d\d\/\d\d\d\d/
    },
    M_D_YYYY_SLASHES: {
        text: 'M/D/YYYY',
        regex: /\d{1,2}\/\d{1,2}\/\d{4}/
    }
};

/**
 * Require a (string) value match a specific date format.
 * @param format The format to use
 * @returns A validation item
 */
export function dateMatchesFormat(format: keyof typeof DateFormat): ValidationItem<string> {
    return {
        errorText: `Input must match format ${DateFormat[format].text}`,
        verify: (value: string) => value.match(DateFormat[format].regex) != null
    }
}

export function numberToStringValidation(validationItem: ValidationItem<number>): ValidationItem<string> {
    const errObj = validationItem.errorText;

    return {
        errorText: typeof errObj === 'string' ? errObj : (val: string) => errObj(Number(val)),
        verify: (value: string) => validationItem.verify(Number(value))
    }
}
